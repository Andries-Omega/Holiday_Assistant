import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-phase-one',
  templateUrl: './phase-one.component.html',
  styleUrls: ['./phase-one.component.scss'],
})
export class PhaseOneComponent {
  @Input() tripName!: string;
  @Input() addingIntentions!: string;
  @Output() newTripName = new EventEmitter<string>();

  updateParentOnTripName() {
    this.newTripName.emit(this.tripName);
  }
}
