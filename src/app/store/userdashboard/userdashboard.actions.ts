import { createAction, props } from '@ngrx/store';
import { ListOfCurrencies } from 'src/app/models/Currencies';
import { AddItenarary, Trip } from 'src/app/models/Itenaries';

export const getCurrencies = createAction('[Userdashboard] get currencies');

export const setCurrencies = createAction(
  '[Userdashboard] set the currencies',
  props<{ currencies: ListOfCurrencies }>()
);
export const setCurrencyAPIStatus = createAction(
  '[Userdashboard] set that api is currency off',
  props<{ currencyAPIRateExceeded: boolean }>()
);
export const setIsAddingItenary = createAction(
  '[Userdashboard] Specify Whether user is currently adding itenary or not',
  props<{ isAddingItenary: AddItenarary }>()
);

export const setTripOfItenary = createAction(
  '[Userdashboard] setting trip of the current itenary being added',
  props<{ tripOfCurrentItenary: Trip | null }>()
);

// incase they click update holiday from itinaries (when i designed it on figma, i thought functionally it will be easy 😢)
export const setTripFromItenary = createAction(
  '[Userdashboard] set Holiday from itinarary',
  props<{ isFromItenaryRoute: Trip | null; toDo: string }>()
);

export const addTrip = createAction(
  '[Userdashboard] add trip',
  props<{ tripData: Trip }>()
);

export const deleteTrip = createAction(
  '[Userdashboard] delete trip',
  props<{ tripID: string }>()
);
export const procedureFailure = createAction(
  '[Userdashboard] network call Failed'
);
export const procedureSuccess = createAction(
  '[Userdashboard] network call success'
);

export const updateTrips = createAction(
  '[Userdashboard] updating user trip',
  props<{ trip: Trip }>()
);
