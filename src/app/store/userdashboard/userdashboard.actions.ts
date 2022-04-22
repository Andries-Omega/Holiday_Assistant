import { createAction, props } from '@ngrx/store';
import { ListOfCurrencies } from 'src/app/models/Currencies';
import { AddItenarary, Holiday } from 'src/app/models/Itenaries';

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

export const setHolidayOfItenary = createAction(
  '[Userdashboard] setting holiday of the current itenary being added',
  props<{ holidayOfCurrentItenary: Holiday | null }>()
);

// incase they click update holiday from itinaries (when i designed it on figma, i thought functionally it will be easy 😢)
export const setHolidayFromItenary = createAction(
  '[Userdashboard] set Holiday from itinarary',
  props<{ isUpdatingFromItenaryRoute: Holiday | null }>()
);
