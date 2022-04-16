import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Users } from 'src/app/models/Users';
import {
  saveSignUpInfo,
  setLoggedInUser,
} from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import {
  selectLoggedInUser,
  selectUserHolidays,
} from 'src/app/store/global/global.selectors';
import {
  getUserFromSelect,
  getUserHolidaysFromSelect,
  initUsers,
  isObjectEmpty,
} from '../CommonFunctions';
import { firstSignIn } from './signPurgatory';

export const isSecondPhaseDone = (user: Users): boolean => {
  return user.name && user.email ? true : false;
};

export const isThirdPhaseDone = (globalStore: Store<AppState>): boolean => {
  const holidays = getUserHolidaysFromSelect(
    globalStore.select(selectUserHolidays)
  );
  console.log(holidays);
  return holidays ? true : false;
};

export const isUserSignedIn = (globalStore: Store<AppState>): boolean => {
  let user = getUserFromSelect(globalStore.select(selectLoggedInUser));
  return !isObjectEmpty(user);
};

export const signIn = (
  userID: string,
  globalStore: Store<AppState>,
  route: Router
) => {
  //1. let the state know it is safe to leave sign up route (Incase they are signing in from registering)
  globalStore.dispatch(
    saveSignUpInfo({
      hasEditedSignUp: false,
    })
  );
  let user = firstSignIn(userID);

  //2. set the user to state and localstorage (In case they refresh)
  globalStore.dispatch(setLoggedInUser({ loggedInUser: user }));

  route.navigateByUrl('dashboard');
};

export const signOutt = (route: Router, globalStore: Store<AppState>) => {
  // 1. Remove user from global state
  globalStore.dispatch(setLoggedInUser({ loggedInUser: initUsers() }));

  // 3. Reload page
  location.reload();
};
