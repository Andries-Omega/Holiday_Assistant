import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { fade } from 'src/app/Animations/dashboard-animations';
import { Holiday } from 'src/app/models/Itenaries';
import { ItenariesService } from 'src/app/services/itenaries.service';
import { saveUserHolidays } from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import {
  selectLoggedInUser,
  selectUserHolidays,
} from 'src/app/store/global/global.selectors';
import { setHolidayFromItenary } from 'src/app/store/userdashboard/userdashboard.actions';
import { selectIsUpdatingHolidayFromI } from 'src/app/store/userdashboard/userdashboard.selectors';
import {
  forceHolidaysRefetch,
  getIsUpdatingHolidayFromItenaryFromSelect,
  getUserFromSelect,
  getUserHolidaysFromSelect,
} from '../../Algorithms/CommonFunctions';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss'],
  animations: [fade],
})
export class HolidaysComponent implements OnInit {
  fadeList: string = 'In';
  fadeAdd: string = 'Out';

  isAddingHoliday: boolean = false;
  addingHoliday: boolean = false;
  addingIntentions: string = 'ADDING';
  selectedHoliday!: Holiday | null;
  isHolidayOptionsClicked: boolean = false;
  processingDeleteOrUpdate: boolean = false;

  holidays = getUserHolidaysFromSelect(
    this.globalStore.select(selectUserHolidays)
  );
  user = getUserFromSelect(this.globalStore.select(selectLoggedInUser));
  isUpdatingHolidayFromI: Holiday | null = null;
  constructor(
    private globalStore: Store<AppState>,
    private itenaryService: ItenariesService
  ) {}

  ngOnInit(): void {
    this.isUpdatingHolidayFromI = getIsUpdatingHolidayFromItenaryFromSelect(
      this.globalStore.select(selectIsUpdatingHolidayFromI)
    );
    if (this.isUpdatingHolidayFromI) {
      //then initiate update
      this.selectedHoliday = this.isUpdatingHolidayFromI;
      this.initiateUpdate();
      //and reset to avoid always being send to adding
      this.globalStore.dispatch(
        setHolidayFromItenary({ isUpdatingFromItenaryRoute: null })
      );
    }
  }

  /**
   * Doing this so i can have smooth transition between showing list of holidays and adding new holiday
   */
  handleSwitchComponents() {
    if (this.isAddingHoliday) {
      // then we entering lists
      this.addToList();
    } else {
      // then we entering add
      this.listToAdd();
    }
  }

  updateListOfHolidays(holiday: Holiday) {
    if (this.holidays) {
      let newHolidays = [...this.holidays, holiday];
      this.globalStore.dispatch(
        saveUserHolidays({ userHolidays: newHolidays })
      );
      location.reload();
    } else {
      location.reload();
    }
  }
  addToList() {
    this.fadeAdd = 'Out'; // Initiate fade out animation
    setTimeout(() => {
      // waiting for the fade animation
      this.isAddingHoliday = false;
      this.fadeList = 'In'; // Initiate fade in animation
      this.addingIntentions = 'ADDING'; // make sure the default intentions are to add a new one
      this.selectedHoliday = null;
    }, 1000);
  }

  listToAdd() {
    this.fadeList = 'Out';
    setTimeout(() => {
      this.isAddingHoliday = true;
      this.fadeAdd = 'In';
    }, 1000);
  }

  handleHolidayClicked(holiday: Holiday) {
    this.selectedHoliday = holiday;
    this.isHolidayOptionsClicked = true;
  }
  handleUserHolidayOption(doing: string) {
    if (doing === 'UPDATE') {
      this.initiateUpdate();
    } else {
      this.deleteHoliday();
    }
  }

  initiateUpdate() {
    this.addingIntentions = 'UPDATING';
    this.listToAdd();
  }

  deleteHoliday() {
    if (this.selectedHoliday) {
      this.processingDeleteOrUpdate = true;
      this.itenaryService
        .deleteHoliday(this.selectedHoliday?.holidayID)
        .then(() => {
          forceHolidaysRefetch(this.globalStore);
        })
        .catch(() => (this.processingDeleteOrUpdate = false));
    }
    this.isHolidayOptionsClicked = false;
  }
}
