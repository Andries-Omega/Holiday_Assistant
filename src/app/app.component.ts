import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/global/global.reducer';
import {
  selectIsLoading,
  selectLoadingMessage,
} from './store/global/global.selectors';
import { DashState } from './store/userdashboard/userdashboard.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading = this.globalStore.select(selectIsLoading);

  loadingMessage = this.globalStore.select(selectLoadingMessage);
  constructor(private globalStore: Store<AppState>) {}
}
