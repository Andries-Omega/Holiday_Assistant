import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanDeactivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { isUserSignedIn } from '../components/Algorithms/Authentication/authetication';
import { isObjectEmpty } from '../components/Algorithms/CommonFunctions';
import { Users } from '../models/Users';
import { setLoggedInUser } from '../store/global/global.actions';
import { AppState } from '../store/global/global.reducer';
import { selectLoggedInUser } from '../store/global/global.selectors';

@Injectable({
  providedIn: 'root',
})
export class DashboardGuard implements CanActivate, CanDeactivate<unknown> {
  loggendInUser = this.globalStore.select(selectLoggedInUser);
  constructor(private globalStore: Store<AppState>, private routes: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    /**
     * To avoid loggin
     */
    const storedUser = sessionStorage.getItem('User');
    if (storedUser && (JSON.parse(storedUser) as Users)) {
      //then a user has been saved and probably what happend was a page reload
      this.globalStore.dispatch(
        setLoggedInUser({ loggedInUser: JSON.parse(storedUser) as Users })
      );
      return true;
    } else {
      return this.loggendInUser.pipe(
        map(() => {
          if (isUserSignedIn(this.globalStore)) {
            return true;
          } else {
            return this.routes.parseUrl('/home');
          }
        })
      );
    }
  }
  canDeactivate(
    component: unknown,
    currentRoute: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState?: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return true;
  }
}
