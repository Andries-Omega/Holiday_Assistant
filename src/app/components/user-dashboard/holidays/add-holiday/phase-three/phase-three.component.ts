import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-phase-three',
  templateUrl: './phase-three.component.html',
  styleUrls: ['./phase-three.component.scss'],
})
export class PhaseThreeComponent {
  date!: Date[];

  @Input() errorMessage!: string;

  @Output() selectedDate = new EventEmitter<Date[]>();

  onChange() {
    if (this.date[0] && this.date[1]) {
      this.selectedDate.emit(this.date);
    }
  }
}
