import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-phase-one',
  templateUrl: './phase-one.component.html',
  styleUrls: ['./phase-one.component.scss'],
})
export class PhaseOneComponent {
  @Input() holidayName!: string;
  @Input() addingIntentions!: string;
  @Output() newHolidayName = new EventEmitter<string>();

  updateParentOnHolidayName() {
    this.newHolidayName.emit(this.holidayName);
  }
}
