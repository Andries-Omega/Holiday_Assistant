import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-switchstate',
  templateUrl: './switchstate.component.html',
  styleUrls: ['./switchstate.component.scss'],
})
export class SwitchStateComponent {
  @Input() currentMode!: boolean;
  @Output() newMode = new EventEmitter<boolean>();

  switchTheme() {
    this.newMode.emit(!this.currentMode);
  }
}
