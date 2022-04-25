import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Trip, ItenaryItem } from 'src/app/models/Itenaries';

@Component({
  selector: 'trip-pop-up',
  templateUrl: './trip-pop-up.component.html',
  styleUrls: ['./trip-pop-up.component.scss'],
})
export class TripPopUpComponent {
  @Input() isTripsOptionsClicked!: boolean;
  @Input() theTrip!: Trip | null;

  @Output() userOption = new EventEmitter<string>();
  @Output() closePopUp = new EventEmitter<void>();
  handleClick(doing: string) {
    this.userOption.emit(doing);
  }
  closepop() {
    this.closePopUp.emit();
  }
}
