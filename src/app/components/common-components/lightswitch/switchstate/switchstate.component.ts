import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-switchstate',
  templateUrl: './switchstate.component.html',
  styleUrls: ['./switchstate.component.scss'],
})
export class SwitchStateComponent implements OnInit {
  @Input() currentMode!: boolean;
  @Output() newMode = new EventEmitter<boolean>();

  constructor() {}

  ngOnInit(): void {}

  switchTheme() {
    this.newMode.emit(!this.currentMode);
  }
}
