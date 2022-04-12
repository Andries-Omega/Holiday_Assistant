import { Store } from '@ngrx/store';
import { Users } from 'src/app/models/Users';
import { setLoggedInUser } from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectLoggedInUser } from 'src/app/store/global/global.selectors';
import { getUserFromSelect, isObjectEmpty } from '../CommonFunctions';

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
