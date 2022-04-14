import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Users } from 'src/app/models/Users';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { setLoggedInUser } from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectLoggedInUser } from 'src/app/store/global/global.selectors';
import {
  isSecondPhaseDone,
  isThirdPhaseDone,
} from '../Algorithms/Authentication/authetication';
import { secondSignIn } from '../Algorithms/Authentication/signPurgatory';
import {
  getUserFromSelect,
  initUsers,
  saveUserToSessionStorage,
} from '../Algorithms/CommonFunctions';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrls: ['./user-dashboard.component.scss'],
})
export class UserDashboardComponent implements OnInit {
  user$ = this.globalStore.select(selectLoggedInUser);
  user: Users = initUsers();
  constructor(
    private globalStore: Store<AppState>,
    private router: Router,
    private authService: AuthServiceService
  ) {}

  ngOnInit(): void {
    console.log(this.router.url);
    this.user = getUserFromSelect(this.user$);

    if (!isSecondPhaseDone(this.user)) {
      this.phaseTwoSignIn();
      return;
    }

    if (!isThirdPhaseDone()) {
      this.phaseThreeSignIn();
      return;
    }
  }
  async phaseTwoSignIn() {
    await this.authService
      .getUserInfo(this.user.userID)
      .then((result: DocumentData | boolean) => {
        if (typeof result !== 'boolean') {
          const theUser: Users = secondSignIn(
            this.user.userID,
            result?.['name'],
            result?.['preferredName'],
            result?.['email']
          );
          //save user to storage (incase of reload)
          saveUserToSessionStorage(theUser);

          //save also to state as this is what we are referrencing
          this.globalStore.dispatch(
            setLoggedInUser({
              loggedInUser: theUser,
            })
          );
          //refresh the component to go to phase three or complete sign in
          this.ngOnInit();
        } else {
          location.reload();
        }
      })
      .catch((err) => location.reload());

    //this.ngOnInit();
  }
  phaseThreeSignIn() {
    //this.ngOnInit();
  }
}
