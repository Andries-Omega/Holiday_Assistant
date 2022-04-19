import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-add-itenary-popup',
  templateUrl: './add-itenary-popup.component.html',
  styleUrls: ['./add-itenary-popup.component.scss'],
})
export class AddItenaryPopupComponent {
  @Input() askToAddItenary!: boolean;
  @Input() selectedDate!: Date;

  @Output() addItenary = new EventEmitter<boolean>();

  handleClick(addItenary: boolean) {
    this.addItenary.emit(addItenary);
  }
}
