import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Holiday, Itenaries } from 'src/app/models/Itenaries';
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

  isAddingItenary = this.dashStore.select(selectIsAddingItenary);

  askToAddItenary: boolean = false;

  constructor(
    private globalStore: Store<AppState>,
    private dashStore: Store<DashState>
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
    console.log(itenaryDetails);
  }
}
