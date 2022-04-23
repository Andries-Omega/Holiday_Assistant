import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trip, Itenary } from 'src/app/models/Itenaries';

@Component({
  selector: 'trip-pop-up',
  templateUrl: './trip-pop-up.component.html',
  styleUrls: ['./trip-pop-up.component.scss'],
})
export class TripPopUpComponent {
  @Input() isTripsOptionsClicked!: boolean;
  @Input() theTrip!: Trip | null;

  @Output() userOption = new EventEmitter<string>();
  handleClick(doing: string) {
    this.userOption.emit(doing);
  }
}
