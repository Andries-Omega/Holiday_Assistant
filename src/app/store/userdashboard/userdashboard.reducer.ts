import { createReducer, on } from '@ngrx/store';
import { ListOfCurrencies } from 'src/app/models/Currencies';
import { Holiday, AddItenarary } from 'src/app/models/Itenaries';
import {
  setCurrencies,
  setCurrencyAPIStatus,
  setHolidayOfItenary,
  setIsAddingItenary,
} from './userdashboard.actions';

export const userdashboardFeatureKey = 'userdashboard';

export interface DashState {
  isAddingItenary: AddItenarary;
  holidayOfCurrentItenary: Holiday | null;
  currencies: ListOfCurrencies;
  currencyAPIRateExceeded: boolean;
}

export const initialState: DashState = {
  isAddingItenary: { isAddingItenary: false, selectedDate: null },
  holidayOfCurrentItenary: null,
  currencies: {} as ListOfCurrencies,
  currencyAPIRateExceeded: false,
};

export const reducer = createReducer(
  initialState,
  on(setIsAddingItenary, (state, { isAddingItenary }) => ({
    ...state,
    isAddingItenary,
  })),
  on(setHolidayOfItenary, (state, { holidayOfCurrentItenary }) => ({
    ...state,
    holidayOfCurrentItenary,
  })),
  on(setCurrencies, (state, { currencies }) => ({
    ...state,
    currencies,
    currencyRateExceeded: false,
  })),
  on(setCurrencyAPIStatus, (state, { currencyAPIRateExceeded }) => ({
    ...state,
    currencyAPIRateExceeded,
  }))
);
