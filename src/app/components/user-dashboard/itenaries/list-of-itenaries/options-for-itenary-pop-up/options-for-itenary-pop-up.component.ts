import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Itenary } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-options-for-itenary-pop-up',
  templateUrl: './options-for-itenary-pop-up.component.html',
  styleUrls: ['./options-for-itenary-pop-up.component.scss'],
})
export class OptionsForItenaryPopUpComponent {
  @Input() itenaryClicked!: boolean;
  @Input() theItenary!: Itenary;

  @Output() userUpdating = new EventEmitter<string>();
  handleClick(doing: string) {
    this.userUpdating.emit(doing);
  }
}
