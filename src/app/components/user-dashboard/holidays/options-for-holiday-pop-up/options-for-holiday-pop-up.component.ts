import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Holiday, Itenary } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-options-for-holiday-pop-up',
  templateUrl: './options-for-holiday-pop-up.component.html',
  styleUrls: ['./options-for-holiday-pop-up.component.scss'],
})
export class OptionsForHolidayPopUpComponent {
  @Input() isHolidayOptionsClicked!: boolean;
  @Input() theHoliday!: Holiday | null;

  @Output() userOption = new EventEmitter<string>();
  handleClick(doing: string) {
    this.userOption.emit(doing);
  }
}
