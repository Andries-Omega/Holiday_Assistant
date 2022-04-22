import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { Holiday, Itenary } from 'src/app/models/Itenaries';
import { Users } from 'src/app/models/Users';
import { saveUserHolidays } from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import { initUsers } from './ModelInitialisers';

/**
 *
 * List of functionalities i might need so i can avoid repeatition
 */
export const isObjectEmpty = (obj: Object): boolean => {
  return !Object.values(obj).some((object) => object);
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

export const getIsAddingItenaryFromSelect = (
  isAddingHoliday$: Observable<boolean>
): boolean => {
  let isAdding = false;
  const theIsAddingSubscription = isAddingHoliday$
    .pipe(
      map((adding) => {
        isAdding = adding;
      })
    )
    .subscribe();
  //and unsubscribe
  unSubscribe(theIsAddingSubscription);
  return isAdding;
};

export const getIsUpdatingHolidayFromItenaryFromSelect = (
  isUpdatingHolidayFromSelect$: Observable<Holiday | null>
): Holiday | null => {
  let isUpdatingHolidayFromSelect: Holiday | null = null;
  const theUpdateHolidaySub = isUpdatingHolidayFromSelect$
    .pipe(
      map((updateHoliday) => {
        isUpdatingHolidayFromSelect = updateHoliday;
      })
    )
    .subscribe();
  //unsubscribe
  unSubscribe(theUpdateHolidaySub);

  return isUpdatingHolidayFromSelect;
};
export const unSubscribe = (subscription: Subscription) => {
  subscription.unsubscribe();
};

export const createListOfAvailableDates = (
  startDate: Date,
  endDate: Date
): Date[] => {
  let listOfAvailableDates: Date[] = [];

  for (
    let date = startDate;
    date <= endDate;
    date.setDate(date.getDate() + 1)
  ) {
    listOfAvailableDates.push(new Date(date));
  }
  return listOfAvailableDates;
};

export const getHolidayById = (id: string, holidays: Holiday[]): Holiday => {
  return holidays.filter((holiday) => holiday.holidayID === id)[0];
};

export const getArrayWithout = (
  index: number,
  itenaray: Itenary,
  focusedHoliday: Holiday
): Itenary[] => {
  return focusedHoliday.holidayItenaries.filter(
    (item) => item !== focusedHoliday.holidayItenaries[index]
  );
};

export const getIndexOfItenary = (
  itenary: Itenary,
  itenaries: Itenary[]
): number => {
  return itenaries.findIndex((itenar) => itenar == itenary);
};

export const forceHolidaysRefetch = (globalStore: Store<AppState>) => {
  //this will for phase three (fetching list of holidays) from dashboard to run
  globalStore.dispatch(saveUserHolidays({ userHolidays: null }));
  location.reload();
};
