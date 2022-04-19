import { Component, OnInit } from '@angular/core';
import { DocumentData } from '@angular/fire/firestore';

import { Store } from '@ngrx/store';
import { Users } from 'src/app/models/Users';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ItenariesService } from 'src/app/services/itenaries.service';
import {
  saveUserHolidays,
  setLoggedInUser,
} from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import {
  selectLoggedInUser,
  selectUserHolidays,
} from 'src/app/store/global/global.selectors';
import {
  isSecondPhaseDone,
  isThirdPhaseDone,
} from '../Algorithms/Authentication/authetication';
import { secondSignIn } from '../Algorithms/Authentication/signPurgatory';
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
  constructor(
    private globalStore: Store<AppState>,
    private authService: AuthServiceService,
    private itenaryService: ItenariesService
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
      .catch(() => location.reload());
  }

  phaseThreeSignIn() {
    this.itenaryService.getAllHolidays(this.user.userID).then((holidays) => {
      this.globalStore.dispatch(saveUserHolidays({ userHolidays: holidays }));
      //refresh ;
      location.reload();
    });
  }
}
