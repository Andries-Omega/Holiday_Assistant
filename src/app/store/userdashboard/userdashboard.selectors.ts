import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserdashboard from './userdashboard.reducer';
import { DashState } from './userdashboard.reducer';

export const selectUserdashboardState =
  createFeatureSelector<fromUserdashboard.DashState>(
    fromUserdashboard.userdashboardFeatureKey
  );

export const selectIsAddingItenary = createSelector(
  selectUserdashboardState,
  (state: DashState) => state.isAddingItenary
);

export const selectTripOfCurrentItenary = createSelector(
  selectUserdashboardState,
  (state: DashState) => state.isAddingItenary
);

export const selectCurrencies = createSelector(
  selectUserdashboardState,
  (state: DashState) => state.currencies
);

export const selectCurrenciesAPIStatus = createSelector(
  selectUserdashboardState,
  (state: DashState) => state.currencyAPIRateExceeded
);

export const selectTripFromI = createSelector(
  selectUserdashboardState,
  (state: DashState) => state.isFromItenaryRoute
);

export const selectIsLoading = createSelector(
  selectUserdashboardState,
  (state: DashState) => state.isLoading
);

export const selectLoadingMessage = createSelector(
  selectUserdashboardState,
  (state: DashState) => state.loadingMessage
);

export const selectToDO = createSelector(
  selectUserdashboardState,
  (state: DashState) => state.toDo
);
