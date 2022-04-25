import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { SignupComponent } from '../components/signup/signup.component';
import { saveSignUpState } from '../store/global/global.actions';
import { AppState } from '../store/global/global.reducer';
import { selectSignUpInfo } from '../store/global/global.selectors';

@Injectable({
  providedIn: 'root',
})
export class CanLeaveSignupGuard implements CanDeactivate<unknown> {
  result!: boolean;
  constructor(private globalStore: Store<AppState>) {}

  canDeactivate(
    component: SignupComponent,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return this.globalStore.select(selectSignUpInfo).pipe(
      map((res) => {
        // make sure object is not null first
        if (res) {
          return res ? this.handleUserConfirm() : true; // do not allow user to re route  if they have some edit of sign up form
        } else {
          return true; // if object is null, then the user hasn't editted
        }
      })
    );
  }

  handleUserConfirm(): boolean {
    const userResponse = confirm(
      'If you leave this page you will loose all your sign up information, still keen to continue?'
    );

    this.globalStore.dispatch(
      saveSignUpState({ hasEditedSignUp: !userResponse })
    );

    return userResponse;
  }
}
