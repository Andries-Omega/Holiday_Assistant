import { Auth, signOut } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Users } from 'src/app/models/Users';
import {
  saveSignUpInfo,
  saveUserTrips,
  setLoggedInUser,
} from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import {
  selectLoggedInUser,
  selectUserTrips,
} from 'src/app/store/global/global.selectors';
import {
  getUserFromSelect,
  getUserTripsFromSelect,
  isObjectEmpty,
} from '../CommonFunctions';
import { initUsers } from '../ModelInitialisers';
import { firstSignIn } from './signPurgatory';

export const isSecondPhaseDone = (user: Users): boolean => {
  return user.name && user.email ? true : false;
};

export const isThirdPhaseDone = (globalStore: Store<AppState>): boolean => {
  const trips = getUserTripsFromSelect(globalStore.select(selectUserTrips));

  return trips ? true : false;
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

export const signOutt = (auth: Auth, globalStore: Store<AppState>) => {
  // 1. sign out firebase
  signOut(auth);
  // 2. Remove user from global state
  globalStore.dispatch(setLoggedInUser({ loggedInUser: initUsers() }));
  // 3. Remove user trips
  globalStore.dispatch(saveUserTrips({ userTrips: null }));
  // 4. Reload page
  location.reload();
};
