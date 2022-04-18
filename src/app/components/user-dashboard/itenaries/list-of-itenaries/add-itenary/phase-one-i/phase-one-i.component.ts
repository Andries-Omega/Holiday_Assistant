import { Component, Input, OnInit } from '@angular/core';
import { Itenaries } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-phase-one-i',
  templateUrl: './phase-one-i.component.html',
  styleUrls: ['./phase-one-i.component.scss'],
})
export class PhaseOneIComponent implements OnInit {
  @Input() selectedDate!: string;
  @Input() itenaryDetails!: Itenaries;
  @Input() listOfAvailableDates!: Date[];
  @Input() startDate!: string | null;
  itenaryDate: string = new Date().toDateString();
  startTime: string = '';
  endTime: string = '';
  ngOnInit() {
    if (this.startDate) {
      console.log('here');
      this.itenaryDate = this.startDate;
    }
  }
  handleSelectedDate() {
    this.selectedDate = this.itenaryDate;
    console.log(this.itenaryDate);
  }

  getDateString(date: Date): string {
    return date.toDateString();
  }
}
