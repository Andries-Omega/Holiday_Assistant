import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-mobile-options',
  templateUrl: './mobile-options.component.html',
  styleUrls: ['./mobile-options.component.scss'],
})
export class MobileOptionsComponent {
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
