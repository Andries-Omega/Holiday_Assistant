import { Component, OnInit } from '@angular/core';
import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { AppState } from 'src/app/store/global/global.reducer';
import { signOutt } from '../../Algorithms/Authentication/authetication';

@Component({
  selector: 'app-dash-options',
  templateUrl: './dash-options.component.html',
  styleUrls: ['./dash-options.component.scss'],
})
export class DashOptionsComponent implements OnInit {
  constructor(
    private auth: Auth,
    private router: Router,
    private globalStore: Store<AppState>
  ) {}

  currentURL: string = '/dashboard';

  ngOnInit(): void {
    this.currentURL = this.router.url;
  }

  logOut() {
    signOut(this.auth);
    signOutt(this.router, this.globalStore);
  }

  routeTo(url: string) {
    this.currentURL = url;
    this.router.navigateByUrl(url);
  }
}
