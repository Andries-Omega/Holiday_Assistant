import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { fade } from 'src/app/Animations/dashboard-animations';
import { Holiday } from 'src/app/models/Itenaries';
import { saveUserHolidays } from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import {
  selectLoggedInUser,
  selectUserHolidays,
} from 'src/app/store/global/global.selectors';
import {
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

  holidays = getUserHolidaysFromSelect(
    this.globalStore.select(selectUserHolidays)
  );
  user = getUserFromSelect(this.globalStore.select(selectLoggedInUser));

  constructor(private router: Router, private globalStore: Store<AppState>) {}

  ngOnInit(): void {}

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
      this.addingIntentions = 'UPDATING';
      this.listToAdd();
      console.log('Updating');
    } else {
      console.log('Deleted');
    }
    this.isHolidayOptionsClicked = false;
  }
}
