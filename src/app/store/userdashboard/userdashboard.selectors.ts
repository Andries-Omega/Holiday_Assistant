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

export const selectHolidayOfCurrentItenary = createSelector(
  selectUserdashboardState,
  (state: fromUserdashboard.DashState) => state.isAddingItenary
);
