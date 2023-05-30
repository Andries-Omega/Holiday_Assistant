import { Component } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { GlobalState } from './store/global-two/global.state';
import { Observable } from 'rxjs';

import {
  SetLoadingMessage,
  ToggleLoading,
} from './store/global-two/global.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoading$: Observable<boolean> = this.store.select(
    ({ global }) => global.isLoading
  );

  loadingMessage$: Observable<string> = this.store.select(
    ({ global }) => global.loadingMessage
  );

  constructor(private store: Store) {}

  handleLoad() {
    this.store.dispatch([
      new ToggleLoading(true),
      new SetLoadingMessage('Testing one two three'),
    ]);

    setTimeout(() => {
      this.store.dispatch([new ToggleLoading(false)]);
    }, 5000);
  }
}
