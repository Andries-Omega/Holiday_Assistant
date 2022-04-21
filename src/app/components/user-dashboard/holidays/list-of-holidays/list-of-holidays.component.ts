import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Holiday } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-list-of-holidays',
  templateUrl: './list-of-holidays.component.html',
  styleUrls: ['./list-of-holidays.component.scss'],
})
export class ListOfHolidaysComponent implements OnInit {
  @Input() holidays!: Holiday[] | null;

  @Output() holidayClick = new EventEmitter<Holiday>();
  constructor() {}

  ngOnInit(): void {}

  identifyHoliday(index: number, holiday: Holiday): string {
    return holiday.holidayID;
  }

  handleHolidayClicked(holiday: Holiday) {
    this.holidayClick.emit(holiday);
  }
}
