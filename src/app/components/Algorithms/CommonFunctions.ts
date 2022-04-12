import { faUserAlt } from '@fortawesome/free-solid-svg-icons';
import { map, Observable, Subscription } from 'rxjs';
import { Users } from 'src/app/models/Users';

/**
 *
 * List of functionalities i might need so i can avoid repeatition
 */
export const isObjectEmpty = (obj: Object): boolean => {
  return !Object.values(obj).some((object) => object);
};

export const initUsers = (): Users => {
  return {
    userID: '',
    name: '',
    email: '',
    password: '',
    preferredName: '',
  };
};

export const getUserFromSelect = (user$: Observable<Users>): Users => {
  let user: Users = initUsers();

  const theUserSubscription = user$
    .pipe(
      map((u) => {
        user = u;
      })
    )
    .subscribe();
  //and unsubscribe
  unSubscribe(theUserSubscription);
  return user;
};

export const unSubscribe = (subscription: Subscription) => {
  subscription.unsubscribe();
};

export const saveUserToSessionStorage = (user: Users) => {
  sessionStorage.setItem('User', JSON.stringify(user));
};
