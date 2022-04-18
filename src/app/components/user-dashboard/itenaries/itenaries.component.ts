import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Holiday } from 'src/app/models/Itenaries';
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

  selectedDate!: Date;
  constructor(
    private globalStore: Store<AppState>,
    private dashStore: Store<DashState>
  ) {}

  ngOnInit(): void {}

  updateIsAdding(isAdding: boolean) {
    this.dashStore.dispatch(setIsAddingItenary({ isAddingItenary: isAdding }));
  }

  handleDateSelected(selectedDate: Date) {
    this.selectedDate = selectedDate;
    this.askToAddItenary = true;
  }

  handleAddItenaryFromPopup(addItenary: boolean) {
    addItenary ? this.switchToAddItenary() : (this.askToAddItenary = false);
  }

  switchToAddItenary() {
    this.dashStore.dispatch(setIsAddingItenary({ isAddingItenary: true }));
    this.askToAddItenary = false;
  }
}
