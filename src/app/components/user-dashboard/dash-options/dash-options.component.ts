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

  ngOnInit(): void {}

  logOut() {
    signOut(this.auth);
    signOutt(this.router, this.globalStore);
  }

  routeClicked(url: string) {
    return this.router.url === url;
  }

  routeTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
