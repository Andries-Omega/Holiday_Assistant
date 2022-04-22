import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-scroll-up',
  templateUrl: './scroll-up.component.html',
  styleUrls: ['./scroll-up.component.scss'],
})
export class ScrollUpComponent {
  showScrollUp: boolean = false;

  @HostListener('document:scroll', ['$event'])
  onWindowScroll() {
    scrollY > 500 ? (this.showScrollUp = true) : (this.showScrollUp = false);
  }

  scrollUp() {
    scrollTo({ top: 0, behavior: 'smooth' });
  }
}
