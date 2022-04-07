import { Component, OnDestroy, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  updateTheme,
  updateThemeAfterReload,
} from 'src/app/store/global/global.actions';
import { selectGlobalTheme } from 'src/app/store/global/global.selectors';

@Component({
  selector: 'app-lightswitch',
  templateUrl: './lightswitch.component.html',
  styleUrls: ['./lightswitch.component.scss'],
})
export class LightSwitchComponent implements OnInit {
  darkMode$ = this.globalStore.select(selectGlobalTheme);

  preferredTheme = localStorage.getItem('preferredTheme');

  constructor(private globalStore: Store) {}

  ngOnInit(): void {
    // so that we preserve the state when user refreshes(or reloads) the page
    if (this.preferredTheme) {
      this.globalStore.dispatch(
        updateThemeAfterReload({ darkMode: this.preferredTheme === 'true' })
      );
    }
  }

  switchTheme(newTheme: boolean) {
    localStorage.setItem('preferredTheme', String(newTheme));
    this.globalStore.dispatch(updateTheme({ darkMode: newTheme }));
  }
}
