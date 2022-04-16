import { map, Observable, Subscription } from 'rxjs';
import { Holiday } from 'src/app/models/Itenaries';
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

export const getUserHolidaysFromSelect = (
  holidays$: Observable<Holiday[] | null>
): Holiday[] | null => {
  let holidays = null;
  if (holidays$) {
    const theHolidaySubscription = holidays$
      .pipe(
        map((h) => {
          holidays = h;
        })
      )
      .subscribe();
    //and unsubscribe
    unSubscribe(theHolidaySubscription);
  }
  return holidays;
};

export const unSubscribe = (subscription: Subscription) => {
  subscription.unsubscribe();
};
