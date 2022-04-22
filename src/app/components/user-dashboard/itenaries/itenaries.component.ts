import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { Holiday, Itenary } from 'src/app/models/Itenaries';
import { ItenariesService } from 'src/app/services/itenaries.service';
import { saveUserHolidays } from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectUserHolidays } from 'src/app/store/global/global.selectors';
import {
  setHolidayFromItenary,
  setIsAddingItenary,
} from 'src/app/store/userdashboard/userdashboard.actions';
import { DashState } from 'src/app/store/userdashboard/userdashboard.reducer';
import { selectIsAddingItenary } from 'src/app/store/userdashboard/userdashboard.selectors';
import {
  forceHolidaysRefetch,
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

  isProcessing: boolean = false;

  constructor(
    private globalStore: Store<AppState>,
    private dashStore: Store<DashState>,
    private itenaryService: ItenariesService,
    private confirmDelete: NzModalService,
    private router: Router
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
      this.showItinararyDeleteConfirm();
    }
    this.itenaryClicked = false;
  }

  updateHoliday(newHoliday: Holiday) {
    this.isProcessing = true;
    this.itenaryService
      .updateHoliday(newHoliday)
      .then(() => {
        this.isProcessing = false;
        forceHolidaysRefetch(this.globalStore);
      })
      .catch(() => (this.isProcessing = false));
  }

  handleUpdateHoliday(holiday: Holiday) {
    this.globalStore.dispatch(
      setHolidayFromItenary({ isUpdatingFromItenaryRoute: holiday })
    );
    // We don't do full holiday update in here
    this.router.navigateByUrl('/dashboard/holidays');
  }

  handleDeleteHoliday(holiday: Holiday) {
    this.focusedHoliday = holiday;
    this.showHolidayDeleteConfirm(holiday);
  }

  showHolidayDeleteConfirm(holiday: Holiday) {
    this.confirmDelete.confirm({
      nzTitle: 'Are you sure delete the holiday => ' + holiday.holidayName,
      nzContent: '<b style="color: red;">You will not get it back</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteHoliday(holiday),
      nzCancelText: 'No',
      nzOnCancel: () => this.confirmDelete.closeAll(),
    });
  }

  showItinararyDeleteConfirm() {
    this.confirmDelete.confirm({
      nzTitle:
        'Are you sure delete the itinarary => ' + this.itenary.itenaryName,
      nzContent: '<b style="color: red;">You will not get it back</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteItenarary(),
      nzCancelText: 'No',
      nzOnCancel: () => this.confirmDelete.closeAll(),
    });
  }
  deleteHoliday(holiday: Holiday) {
    this.isProcessing = true;
    this.itenaryService
      .deleteHoliday(holiday.holidayID)
      .then(() => {
        this.isProcessing = false;
        forceHolidaysRefetch(this.globalStore);
      })
      .catch((err) => {
        console.log(err);
        console.log(holiday.holidayID);
        this.isProcessing = false;
      });
  }

  deleteItenarary() {
    this.isProcessing = true;
    const newHoliday = {
      ...this.focusedHoliday,
      holidayItenaries: [
        ...getArrayWithout(
          getIndexOfItenary(this.itenary, this.focusedHoliday.holidayItenaries),
          this.itenary,
          this.focusedHoliday
        ),
      ],
    };
    this.updateHoliday(newHoliday);
  }
}
