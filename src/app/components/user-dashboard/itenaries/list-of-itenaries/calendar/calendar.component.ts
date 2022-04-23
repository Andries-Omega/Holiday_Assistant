import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { slide } from 'src/app/Animations/dashboard-animations';
import { Itenary } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  animations: [slide],
})
export class CalendarComponent implements OnInit {
  @Input() itenaries!: Itenary[];
  @Input() tripStartDate!: string | null;
  @Input() tripEndDate!: string | null;
  @Input() isAddingItenary!: boolean | null;

  @Output() dateSelected = new EventEmitter<Date>();
  @Output() dateSelectedMobile = new EventEmitter<Date>();
  @Output() itenaryClicked = new EventEmitter<Itenary>();

  startDate: Date = new Date();
  endDate: Date = new Date();
  selectedDate: Date = new Date();
  timeOut: ReturnType<typeof setTimeout> | null = null;

  ngOnInit(): void {
    if (this.tripStartDate && this.tripEndDate) {
      this.startDate = new Date(this.tripStartDate);
      this.endDate = new Date(this.tripEndDate);
      this.selectedDate = this.startDate;
    }
  }

  handleDateSelectedDesktop() {
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
  handleDateSelectedMobile() {
    if (
      this.selectedDate >= this.startDate &&
      this.selectedDate <= this.endDate
    ) {
      this.dateSelectedMobile.emit(this.selectedDate);
    }
  }
  identifyItenary(index: number, itenary: Itenary) {
    return itenary;
  }
  handleItenaryClicked(itenary: Itenary) {
    this.itenaryClicked.emit(itenary);
  }
}
