import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Itenaries } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() itenaries!: Itenaries[];
  @Input() holidayStartDate!: string | null;
  @Input() holidayEndDate!: string | null;
  @Input() isAddingItenary!: boolean | null;
  @Output() dateSelected = new EventEmitter<Date>();
  @Output() itenaryClicked = new EventEmitter<Itenaries>();
  startDate: Date = new Date();
  endDate: Date = new Date();
  selectedDate: Date = new Date();
  timeOut: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (this.holidayStartDate && this.holidayEndDate) {
      this.startDate = new Date(this.holidayStartDate);
      this.endDate = new Date(this.holidayEndDate);
      this.selectedDate = this.startDate;
    }
  }

  handleDateSelected() {
    if (this.timeOut) {
      clearTimeout(this.timeOut); //so you don't get double popoups
    }

    if (
      this.selectedDate >= this.startDate &&
      this.selectedDate <= this.endDate
    ) {
      this.timeOut = setTimeout(() => {
        this.dateSelected.emit(this.selectedDate);
      }, 1500);
    }
  }
  identifyItenary(index: number, itenary: Itenaries) {
    return itenary;
  }
  handleItenaryClicked(itenary: Itenaries) {
    this.itenaryClicked.emit(itenary);
  }
}
