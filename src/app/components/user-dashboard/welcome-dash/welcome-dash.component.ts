import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectLoggedInUser } from 'src/app/store/global/global.selectors';

@Component({
  selector: 'app-welcome-dash',
  templateUrl: './welcome-dash.component.html',
  styleUrls: ['./welcome-dash.component.scss'],
})
export class WelcomeDashComponent {
  // nothing to do here, just for views
  user$ = this.globalStore.pipe(select(selectLoggedInUser));
  constructor(private globalStore: Store<AppState>) {}
}
