import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromUserdashboard from './userdashboard.reducer';

export const selectUserdashboardState =
  createFeatureSelector<fromUserdashboard.DashState>(
    fromUserdashboard.userdashboardFeatureKey
  );

export const selectIsAddingItenary = createSelector(
  selectUserdashboardState,
  (state: fromUserdashboard.DashState) => state.isAddingItenary
);

export const selectTripOfCurrentItenary = createSelector(
  selectUserdashboardState,
  (state: fromUserdashboard.DashState) => state.isAddingItenary
);

export const selectCurrencies = createSelector(
  selectUserdashboardState,
  (state: fromUserdashboard.DashState) => state.currencies
);

export const selectCurrenciesAPIStatus = createSelector(
  selectUserdashboardState,
  (state: fromUserdashboard.DashState) => state.currencyAPIRateExceeded
);

export const selectIsUpdatingTripFromI = createSelector(
  selectUserdashboardState,
  (state: fromUserdashboard.DashState) => state.isUpdatingFromItenaryRoute
);
