import { Component, OnDestroy, OnInit } from '@angular/core';
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

  constructor(private globalStore: Store) {}

  ngOnInit(): void {}

  switchTheme(newTheme: boolean) {
    this.globalStore.dispatch(updateTheme({ darkMode: newTheme }));
  }
}
