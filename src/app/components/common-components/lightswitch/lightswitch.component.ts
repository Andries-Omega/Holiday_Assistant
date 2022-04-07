import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { updateTheme } from 'src/app/store/global/global.actions';
import { selectGlobalTheme } from 'src/app/store/global/global.selectors';

@Component({
  selector: 'app-lightswitch',
  templateUrl: './lightswitch.component.html',
  styleUrls: ['./lightswitch.component.scss'],
})
export class LightSwitchComponent implements OnInit {
  darkMode$ = this.globalStore.select(selectGlobalTheme);
  currentMode: boolean = false;
  constructor(private globalStore: Store) {}

  ngOnInit(): void {
    this.darkMode$.subscribe((d) => (this.currentMode = d));
  }

  switchTheme() {
    console.log(this.currentMode);
    this.globalStore.dispatch(updateTheme({ darkMode: !this.currentMode }));
  }
}
