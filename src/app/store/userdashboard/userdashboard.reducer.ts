import { createReducer, on } from '@ngrx/store';
import { ListOfCurrencies } from 'src/app/models/Currencies';
import { Trip, AddItenarary } from 'src/app/models/Itenaries';
import {
  setCurrencies,
  setCurrencyAPIStatus,
  setTripFromItenary,
  setTripOfItenary,
  setIsAddingItenary,
  getCurrencies,
  procedureFailure,
  addTrip,
  deleteTrip,
  procedureSuccess,
  updateTrips,
} from './userdashboard.actions';

export const userdashboardFeatureKey = 'userdashboard';

export interface DashState {
  isAddingItenary: AddItenarary;
  tripOfCurrentItenary: Trip | null;
  currencies: ListOfCurrencies | null;
  currencyAPIRateExceeded: boolean;
  isFromItenaryRoute: Trip | null;
  isLoading: boolean;
  loadingMessage: string;
  toDo: string;
}

export const initialState: DashState = {
  isAddingItenary: { isAddingItenary: false, selectedDate: null },
  tripOfCurrentItenary: null,
  currencies: null,
  isFromItenaryRoute: null,
  currencyAPIRateExceeded: false,
  isLoading: false,
  loadingMessage: '',
  toDo: 'UPDATE',
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
  on(addTrip, (state) => ({
    ...state,
    isLoading: true,
    loadingMessage: 'adding trip...',
  })),
  on(deleteTrip, (state) => ({
    ...state,
    isLoading: true,
    loadingMessage: 'deleting trip...',
  })),
  on(getCurrencies, (state) => ({
    ...state,
    isLoading: true,
    loadingMessage: 'fetching currencies',
  })),
  on(setCurrencies, (state, { currencies }) => ({
    ...state,
    currencies,
    isLoading: false,
    currencyRateExceeded: false,
  })),
  on(updateTrips, (state) => ({
    ...state,
    isLoading: true,
    loadingMessage: 'Updating trip...',
  })),
  on(procedureSuccess, (state) => ({
    ...state,
    isLoading: false,
    isAddingItenary: { isAddingItenary: false, selectedDate: null },
  })),
  on(procedureFailure, (state) => ({ ...state, isLoading: false })),
  on(setCurrencyAPIStatus, (state, { currencyAPIRateExceeded }) => ({
    ...state,
    currencyAPIRateExceeded,
  })),
  on(setTripFromItenary, (state, { isFromItenaryRoute, toDo }) => ({
    ...state,
    isFromItenaryRoute,
    toDo,
  }))
);
