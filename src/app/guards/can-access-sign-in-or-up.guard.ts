import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { isUserSignedIn } from '../components/Algorithms/Authentication/authetication';
import { AppState } from '../store/global/global.reducer';

@Injectable({
  providedIn: 'root',
})
export class CanAccessSignInOrUpGuard implements CanActivate {
  constructor(private globalStore: Store<AppState>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    return isUserSignedIn(this.globalStore)
      ? this.router.parseUrl('/dashboard')
      : true;
  }
}
