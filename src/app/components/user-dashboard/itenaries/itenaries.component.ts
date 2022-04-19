import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Holiday, Itenaries } from 'src/app/models/Itenaries';
import { ItenariesService } from 'src/app/services/itenaries.service';
import { saveUserHolidays } from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectUserHolidays } from 'src/app/store/global/global.selectors';
import { setIsAddingItenary } from 'src/app/store/userdashboard/userdashboard.actions';
import { DashState } from 'src/app/store/userdashboard/userdashboard.reducer';
import { selectIsAddingItenary } from 'src/app/store/userdashboard/userdashboard.selectors';
import { getUserHolidaysFromSelect } from '../../Algorithms/CommonFunctions';

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
  itenary!: Itenaries;
  addIntention: string = 'ADDING';
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

  handleDateSelected(selectedDate: Date) {
    this.updateIsAdding(false, selectedDate);
    this.askToAddItenary = true;
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

  handleAddItenaryDetails(itenaryDetails: Itenaries) {
    if (this.focusedHoliday) {
      if (this.addIntention === 'ADDING') {
        const newHoliday = {
          ...this.focusedHoliday,
          holidayItenaries: [
            ...this.focusedHoliday.holidayItenaries,
            itenaryDetails,
          ],
        };

        this.itenaryService.updateHoliday(newHoliday).then(() => {
          //this will for phase three (fetching list of holidays) from dashboard to run
          this.globalStore.dispatch(saveUserHolidays({ userHolidays: null }));
          location.reload();
        });
      } else {
        let index = this.focusedHoliday.holidayItenaries.findIndex(
          (itenar) => itenar == this.itenary
        );

        const newHoliday = {
          ...this.focusedHoliday,
          holidayItenaries: [
            ...this.getArrayWithout(index, this.itenary),
            itenaryDetails,
          ],
        };
        console.log(this.itenary);
        console.log(itenaryDetails);
        console.log(this.getArrayWithout(index, this.itenary));

        this.itenaryService.updateHoliday(newHoliday).then(() => {
          //this will for phase three (fetching list of holidays) from dashboard to run
          this.globalStore.dispatch(saveUserHolidays({ userHolidays: null }));
          location.reload();
        });
      }
    }
  }

  handleItenaryClicked(itenary: Itenaries) {
    this.itenary = itenary;
    this.itenaryClicked = true;
  }

  handleUserUpdating(doing: string) {
    if (doing === 'UPDATE') {
      this.addIntention = doing;
      this.updateIsAdding(true, new Date(this.itenary.itenaryDate));
    } else {
    }
    this.itenaryClicked = false;
  }

  getArrayWithout(index: number, itenaray: Itenaries): Itenaries[] {
    return this.focusedHoliday.holidayItenaries.filter(
      (item) => item !== this.focusedHoliday.holidayItenaries[index]
    );
  }
}
