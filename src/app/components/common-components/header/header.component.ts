import { Component, OnInit } from '@angular/core';
import { Router, RouterStateSnapshot } from '@angular/router';
import { Store } from '@ngrx/store';
import { Users } from 'src/app/models/Users';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectLoggedInUser } from 'src/app/store/global/global.selectors';
import { isUserSignedIn } from '../../Algorithms/Authentication/authetication';
import {
  getUserFromSelect,
  initUsers,
  isObjectEmpty,
} from '../../Algorithms/CommonFunctions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  user: Users = initUsers();

  constructor(private router: Router, private globalStore: Store<AppState>) {}

  ngOnInit(): void {
    if (this.isUserLoggedIn()) {
      this.user = getUserFromSelect(
        this.globalStore.select(selectLoggedInUser)
      );
    }
  }

  navigateTo(url: string) {
    this.router.navigateByUrl(url);
  }

  isUserLoggedIn(): boolean {
    const isSignedIn = isUserSignedIn(this.globalStore);
    if (isObjectEmpty(this.user) && isSignedIn) {
      this.user = getUserFromSelect(
        this.globalStore.select(selectLoggedInUser)
      );
    }
    return isSignedIn;
  }

  isNotDashboard() {
    return !this.router.url.includes('/dashboard');
  }
  setUserLoggedIn() {}
}
