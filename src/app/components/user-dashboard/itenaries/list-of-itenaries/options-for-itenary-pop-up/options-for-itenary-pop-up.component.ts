import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ItenaryItem } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-options-for-itenary-pop-up',
  templateUrl: './options-for-itenary-pop-up.component.html',
  styleUrls: ['./options-for-itenary-pop-up.component.scss'],
})
export class OptionsForItenaryPopUpComponent {
  @Input() itenaryClicked!: boolean;
  @Input() theItenary!: ItenaryItem;

  @Output() userUpdating = new EventEmitter<string>();
  @Output() cancelPopUp = new EventEmitter<void>();

  handleClick(doing: string) {
    this.userUpdating.emit(doing);
  }
  cancelPopup() {
    this.cancelPopUp.emit();
  }
}
