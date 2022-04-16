import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Location } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-phase-two',
  templateUrl: './phase-two.component.html',
  styleUrls: ['./phase-two.component.scss'],
})
export class PhaseTwoComponent {
  placeName: string = '';
  @Input() errorMessage!: string;
  @Input() locationDetails!: Location | null;
  @Output() searchPlace = new EventEmitter<string>();
  @Output() locationConfirmed = new EventEmitter<Location>();

  selectedLocation: boolean = false;
  @Input() isSearching!: boolean;
  searchForPlace() {
    this.searchPlace.emit(this.placeName);
  }

  confirmLocation() {
    if (this.locationDetails) {
      this.locationConfirmed.emit(this.locationDetails);
      this.selectedLocation = true;
    }
  }
}
