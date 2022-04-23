import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trip } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-list-of-trips',
  templateUrl: './list-of-trips.component.html',
  styleUrls: ['./list-of-trips.component.scss'],
})
export class ListOfTripsComponent implements OnInit {
  @Input() trips!: Trip[] | null;

  @Output() tripClick = new EventEmitter<Trip>();
  constructor() {}

  ngOnInit(): void {}

  identifyTrip(index: number, trip: Trip): string {
    return trip.tripID;
  }

  handleTripClicked(holiday: Trip) {
    this.tripClick.emit(holiday);
  }
}
