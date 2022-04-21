import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Holiday, Itenary } from 'src/app/models/Itenaries';
import { ItenariesService } from 'src/app/services/itenaries.service';
import { saveUserHolidays } from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectUserHolidays } from 'src/app/store/global/global.selectors';
import { setIsAddingItenary } from 'src/app/store/userdashboard/userdashboard.actions';
import { DashState } from 'src/app/store/userdashboard/userdashboard.reducer';
import { selectIsAddingItenary } from 'src/app/store/userdashboard/userdashboard.selectors';
import {
  getArrayWithout,
  getIndexOfItenary,
  getUserHolidaysFromSelect,
} from '../../Algorithms/CommonFunctions';

@Component({
  selector: 'app-itenaries',
  templateUrl: './itenaries.component.html',
  styleUrls: ['./itenaries.component.scss'],
})
export class ItenariesComponent implements OnInit {
  holidays: Holiday[] | null = getUserHolidaysFromSelect(
    this.globalStore.select(selectUserHolidays)
  );

  focusedHoliday!: Holiday;
  isAddingItenary = this.dashStore.select(selectIsAddingItenary);

  askToAddItenary: boolean = false;
  itenaryClicked: boolean = false;
  itenary!: Itenary;
  addIntention: string = 'ADDING';
  isMobileShowingItinararies: boolean = false;
  constructor(
    private globalStore: Store<AppState>,
    private dashStore: Store<DashState>,
    private itenaryService: ItenariesService
  ) {}

  ngOnInit(): void {}

  updateIsAdding(isAddingItenary: boolean, selectedDate: Date | null) {
    this.dashStore.dispatch(
      setIsAddingItenary({
        isAddingItenary: {
          isAddingItenary,
          selectedDate,
        },
      })
    );
  }
  handleAddItenaryMobile(selectedDate: Date) {
    this.isMobileShowingItinararies = false;
    setTimeout(() => {
      this.updateIsAdding(true, selectedDate);
    }, 700);
  }
  handleDateSelected(selectedDate: Date) {
    this.updateIsAdding(false, selectedDate);
    this.askToAddItenary = true;
  }

  handleDateSelectedMobile(selectedDate: Date) {
    this.updateIsAdding(false, selectedDate);
    this.isMobileShowingItinararies = true;
  }

  handleAddItenaryFromPopup(addItenary: boolean, selectedDate: Date | null) {
    addItenary
      ? this.switchToAddItenary(selectedDate)
      : (this.askToAddItenary = false);
  }

  switchToAddItenary(selectedDate: Date | null) {
    this.updateIsAdding(true, selectedDate);
    this.askToAddItenary = false;
  }

  handleAddItenaryDetails(itenaryDetails: Itenary) {
    if (this.focusedHoliday) {
      if (this.addIntention === 'ADDING') {
        const newHoliday = {
          ...this.focusedHoliday,
          holidayItenaries: [
            ...this.focusedHoliday.holidayItenaries,
            itenaryDetails,
          ],
        };

        this.updateHoliday(newHoliday);
      } else {
        let index = getIndexOfItenary(
          this.itenary,
          this.focusedHoliday.holidayItenaries
        );

        const newHoliday = {
          ...this.focusedHoliday,
          holidayItenaries: [
            ...getArrayWithout(index, this.itenary, this.focusedHoliday),
            itenaryDetails,
          ],
        };
        this.updateHoliday(newHoliday);
      }
    }
  }

  handleItenaryClicked(itenary: Itenary) {
    this.itenary = itenary;
    this.itenaryClicked = true;
  }

  handleUserUpdating(doing: string) {
    if (doing === 'UPDATE') {
      this.addIntention = doing;
      if (this.isMobileShowingItinararies) {
        this.isMobileShowingItinararies = false;
        setTimeout(() => {
          this.updateIsAdding(true, new Date(this.itenary.itenaryDate));
        }, 700);
      } else {
        this.updateIsAdding(true, new Date(this.itenary.itenaryDate));
      }
    } else {
      const newHoliday = {
        ...this.focusedHoliday,
        holidayItenaries: [
          ...getArrayWithout(
            getIndexOfItenary(
              this.itenary,
              this.focusedHoliday.holidayItenaries
            ),
            this.itenary,
            this.focusedHoliday
          ),
        ],
      };
      this.updateHoliday(newHoliday);
    }
    this.itenaryClicked = false;
  }

  updateHoliday(newHoliday: Holiday) {
    this.itenaryService.updateHoliday(newHoliday).then(() => {
      //this will for phase three (fetching list of holidays) from dashboard to run
      this.globalStore.dispatch(saveUserHolidays({ userHolidays: null }));
      location.reload();
    });
  }
}
