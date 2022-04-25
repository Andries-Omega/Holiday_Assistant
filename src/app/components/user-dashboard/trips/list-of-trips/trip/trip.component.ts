import { Component, Input } from '@angular/core';

import { Trip } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-trip',
  templateUrl: './trip.component.html',
  styleUrls: ['./trip.component.scss'],
})
export class TripComponent {
  @Input() trip!: Trip;

  getDate() {
    console.log(this.trip.tripStartDate);
    if (this.trip.tripStartDate) {
      return new Date();
    } else {
      return new Date();
    }
  }
}
