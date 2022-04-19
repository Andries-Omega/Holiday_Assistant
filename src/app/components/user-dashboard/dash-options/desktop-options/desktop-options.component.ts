import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-desktop-options',
  templateUrl: './desktop-options.component.html',
  styleUrls: ['./desktop-options.component.scss'],
})
export class DesktopOptionsComponent {
  @Output() routing = new EventEmitter<string>();
  @Output() signingOut = new EventEmitter<void>();
  @Input() routerURL!: string;

  handleRouteTo(url: string) {
    this.routing.emit(url);
  }

  handleLogout() {
    this.signingOut.emit();
  }
}
