import { Component, Input, OnInit } from '@angular/core';
import { Itenaries } from 'src/app/models/Itenaries';
import * as m from 'moment';
@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() itenaries!: Itenaries[];
  @Input() holidayStartDate!: string | null;
  @Input() holidayEndDate!: string | null;
  startDate: Date = new Date();
  endDate: Date = new Date();
  selectedDate: Date = new Date();
  constructor() {}

  ngOnInit(): void {
    if (this.holidayStartDate && this.holidayEndDate) {
      this.startDate = new Date(this.holidayStartDate);
      this.endDate = new Date(this.holidayEndDate);
      this.selectedDate = this.startDate;
    }
  }
}
