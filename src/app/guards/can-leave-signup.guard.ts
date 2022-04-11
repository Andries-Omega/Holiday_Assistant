import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanDeactivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { map, Observable } from 'rxjs';
import { ConfirmModalComponent } from '../components/common-components/modals/confirm-modal/confirm-modal.component';
import { SignupComponent } from '../components/signup/signup.component';
import { saveSignUpInfo } from '../store/global/global.actions';
import { AppState } from '../store/global/global.reducer';
import { selectSignUpInfo } from '../store/global/global.selectors';

@Injectable({
  providedIn: 'root',
})
export class CanLeaveSignupGuard implements CanDeactivate<unknown> {
  result!: boolean;
  constructor(private globalStore: Store<AppState>) {}

  canDeactivate(
    component: ConfirmModalComponent,
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
      saveSignUpInfo({ hasEditedSignUp: !userResponse })
    );

    return userResponse;
  }
}
