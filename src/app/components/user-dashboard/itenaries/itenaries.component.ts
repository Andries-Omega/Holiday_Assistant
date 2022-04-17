import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Holiday } from 'src/app/models/Itenaries';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectUserHolidays } from 'src/app/store/global/global.selectors';
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
  constructor(private globalStore: Store<AppState>) {}

  ngOnInit(): void {}
}
