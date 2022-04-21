import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Router, RouterStateSnapshot } from '@angular/router';
import { signOut } from '@firebase/auth';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { rotateAxis, slide } from 'src/app/Animations/dashboard-animations';
import { Users } from 'src/app/models/Users';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectLoggedInUser } from 'src/app/store/global/global.selectors';
import {
  isUserSignedIn,
  signOutt,
} from '../../Algorithms/Authentication/authetication';
import {
  getUserFromSelect,
  isObjectEmpty,
} from '../../Algorithms/CommonFunctions';
import { initUsers } from '../../Algorithms/ModelInitialisers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  animations: [rotateAxis, slide],
})
export class HeaderComponent implements OnInit {
  user: Observable<Users> = this.globalStore.select(selectLoggedInUser);
  rotateBurger: string = '';
  burgerOpen: boolean = false;
  currentURL: string = this.router.url;

  constructor(
    private router: Router,
    private globalStore: Store<AppState>,
    private auth: Auth
  ) {}

  ngOnInit(): void {}

  navigateTo(url: string) {
    this.currentURL = url;
    this.router.navigateByUrl(url);
  }

  isUserLoggedIn(): boolean {
    isUserSignedIn(this.globalStore);
    return isUserSignedIn(this.globalStore);
  }

  isNotDashboard() {
    return !this.router.url.includes('/dashboard');
  }

  logOut() {
    signOut(this.auth);
    signOutt(this.router, this.globalStore);
  }
}
