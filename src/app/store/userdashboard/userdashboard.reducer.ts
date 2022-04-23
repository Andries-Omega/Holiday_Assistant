import { createReducer, on } from '@ngrx/store';
import { ListOfCurrencies } from 'src/app/models/Currencies';
import { Trip, AddItenarary } from 'src/app/models/Itenaries';
import {
  setCurrencies,
  setCurrencyAPIStatus,
  setTripFromItenary,
  setTripOfItenary,
  setIsAddingItenary,
} from './userdashboard.actions';

export const userdashboardFeatureKey = 'userdashboard';

export interface DashState {
  isAddingItenary: AddItenarary;
  tripOfCurrentItenary: Trip | null;
  currencies: ListOfCurrencies;
  currencyAPIRateExceeded: boolean;
  isUpdatingFromItenaryRoute: Trip | null;
}

export const initialState: DashState = {
  isAddingItenary: { isAddingItenary: false, selectedDate: null },
  tripOfCurrentItenary: null,
  currencies: {} as ListOfCurrencies,
  isUpdatingFromItenaryRoute: null,
  currencyAPIRateExceeded: false,
};

export const reducer = createReducer(
  initialState,
  on(setIsAddingItenary, (state, { isAddingItenary }) => ({
    ...state,
    isAddingItenary,
  })),
  on(
    setTripOfItenary,
    (state, { tripOfCurrentItenary: tripOfCurrentItenary }) => ({
      ...state,
      tripOfCurrentItenary: tripOfCurrentItenary,
    })
  ),
  on(setCurrencies, (state, { currencies }) => ({
    ...state,
    currencies,
    currencyRateExceeded: false,
  })),
  on(setCurrencyAPIStatus, (state, { currencyAPIRateExceeded }) => ({
    ...state,
    currencyAPIRateExceeded,
  })),
  on(setTripFromItenary, (state, { isUpdatingFromItenaryRoute }) => ({
    ...state,
    isUpdatingFromItenaryRoute,
  }))
);
