import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Users } from 'src/app/models/Users';
import {
  saveSignUpInfo,
  setLoggedInUser,
} from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectLoggedInUser } from 'src/app/store/global/global.selectors';
import {
  getUserFromSelect,
  isObjectEmpty,
  saveUserToSessionStorage,
} from '../CommonFunctions';
import { firstSignIn } from './signPurgatory';

export const isSecondPhaseDone = (user: Users): boolean => {
  return user.name && user.email ? true : false;
};

export const isThirdPhaseDone = (): boolean => {
  return true;
};

export const isUserSignedIn = (globalStore: Store<AppState>): boolean => {
  //1. get session storage instance of user
  const userStorage = sessionStorage.getItem('User');
  console.log(userStorage);
  if (userStorage && (JSON.parse(userStorage) as Users)) {
    //then we've logged In

    // 2. get state user
    let user = getUserFromSelect(globalStore.select(selectLoggedInUser));

    // 3. For performance sake, don't  set state if it is already set.
    if (isObjectEmpty(user)) {
      globalStore.dispatch(
        setLoggedInUser({ loggedInUser: JSON.parse(userStorage) as Users })
      );
    }

    return true;
  } else {
    return false;
  }
};

export const signIn = (
  userID: string,
  globalStore: Store<AppState>,
  route: Router
) => {
  //1. let the state know it is safe to leave sign up route
  globalStore.dispatch(
    saveSignUpInfo({
      hasEditedSignUp: false,
    })
  );
  let user = firstSignIn(userID);

  //2. saveUser to session storage ('Just incase of refres')
  saveUserToSessionStorage(user);
  //3. set the user to state and localstorage (In case they refresh)
  globalStore.dispatch(setLoggedInUser({ loggedInUser: user }));

  route.navigateByUrl('dashboard');
};
