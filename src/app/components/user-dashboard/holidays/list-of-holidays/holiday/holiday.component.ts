import { Component, Input } from '@angular/core';

import { Holiday } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-holiday',
  templateUrl: './holiday.component.html',
  styleUrls: ['./holiday.component.scss'],
})
export class HolidayComponent {
  @Input() holiday!: Holiday;

  getDate() {
    console.log(this.holiday.holidayStartDate);
    if (this.holiday.holidayStartDate) {
      return new Date();
    } else {
      return new Date();
    }
  }
}
