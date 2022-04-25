import { Store } from '@ngrx/store';
import { map, Observable, Subscription } from 'rxjs';
import { Trip, ItenaryItem } from 'src/app/models/Itenaries';
import { Users } from 'src/app/models/Users';
import { saveUserTrips } from 'src/app/store/global/global.actions';
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

export const getUserTripsFromSelect = (
  Trips$: Observable<Trip[] | null>
): Trip[] | null => {
  let Trips = null;
  if (Trips$) {
    const theTripsubscription = Trips$.pipe(
      map((h) => {
        Trips = h;
      })
    ).subscribe();
    //and unsubscribe
    unSubscribe(theTripsubscription);
  }
  return Trips;
};

export const getIsAddingItenaryFromSelect = (
  isAddingTrip$: Observable<boolean>
): boolean => {
  let isAdding = false;
  const theIsAddingSubscription = isAddingTrip$
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

export const getIsUpdatingTripFromItenaryFromSelect = (
  isUpdatingTripFromSelect$: Observable<Trip | null>
): Trip | null => {
  let isUpdatingTripFromSelect: Trip | null = null;
  const theUpdateTripsub = isUpdatingTripFromSelect$
    .pipe(
      map((updateTrip) => {
        isUpdatingTripFromSelect = updateTrip;
      })
    )
    .subscribe();
  //unsubscribe
  unSubscribe(theUpdateTripsub);

  return isUpdatingTripFromSelect;
};

export const getToDoFromSelect = (toDo$: Observable<string>): string => {
  let toDo: string = 'UPDATE';
  const theUpdateTripsub = toDo$
    .pipe(
      map((tD) => {
        toDo = tD;
      })
    )
    .subscribe();
  //unsubscribe
  unSubscribe(theUpdateTripsub);

  return toDo;
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

export const getTripById = (id: string, trips: Trip[]): Trip => {
  return trips.filter((trip) => trip.tripID === id)[0];
};

export const getArrayWithout = (
  index: number,
  itenaray: ItenaryItem,
  focusedTrip: Trip
): ItenaryItem[] => {
  return focusedTrip.tripItenaries.filter(
    (item) => item !== focusedTrip.tripItenaries[index]
  );
};

export const getIndexOfItenary = (
  itenary: ItenaryItem,
  itenaries: ItenaryItem[]
): number => {
  return itenaries.findIndex((itenar) => itenar == itenary);
};

export const forceTripsRefetch = (globalStore: Store<AppState>) => {
  //this will for phase three (fetching list of Trips) from dashboard to run
  globalStore.dispatch(saveUserTrips({ userTrips: null }));
  location.reload();
};

export const isMobile = (): boolean => {
  return innerWidth < 480;
};
