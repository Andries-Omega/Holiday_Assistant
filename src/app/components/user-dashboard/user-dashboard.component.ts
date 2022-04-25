import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Users } from 'src/app/models/Users';
import { getTrips, getUserInfo } from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectLoggedInUser } from 'src/app/store/global/global.selectors';
import { DashState } from 'src/app/store/userdashboard/userdashboard.reducer';
import {
  selectIsLoading,
  selectLoadingMessage,
} from 'src/app/store/userdashboard/userdashboard.selectors';
import {
  isSecondPhaseDone,
  isThirdPhaseDone,
} from '../Algorithms/Authentication/authetication';
import { getUserFromSelect } from '../Algorithms/CommonFunctions';
import { initUsers } from '../Algorithms/ModelInitialisers';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  user$ = this.globalStore.select(selectLoggedInUser);

  user: Users = initUsers();
  isLoading = this.dashStore.select(selectIsLoading);
  loadingMessage = this.dashStore.select(selectLoadingMessage);

  constructor(
    private globalStore: Store<AppState>,
    private dashStore: Store<DashState>
  ) {}

  ngOnInit(): void {
    this.user = getUserFromSelect(this.user$);

    if (!isSecondPhaseDone(this.user)) {
      this.phaseTwoSignIn();
    }

    if (!isThirdPhaseDone(this.globalStore)) {
      this.phaseThreeSignIn();
    }
  }

  phaseTwoSignIn() {
    this.globalStore.dispatch(getUserInfo({ userID: this.user.userID }));
  }

  phaseThreeSignIn() {
    this.globalStore.dispatch(getTrips({ userID: this.user.userID }));
  }
}
