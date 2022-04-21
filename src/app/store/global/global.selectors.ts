import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, globalFeatureKey } from './global.reducer';

export const selectGlobalState =
  createFeatureSelector<AppState>(globalFeatureKey);

export const selectGlobalTheme = createSelector(
  selectGlobalState,
  (state: AppState) => state?.darkMode
);

export const selectSignUpInfo = createSelector(
  selectGlobalState,
  (state: AppState) => state?.hasEditedSignUp
);

export const selectLoggedInUser = createSelector(
  selectGlobalState,
  (state: AppState) => state.loggedInUser
);

export const selectUserHolidays = createSelector(
  selectGlobalState,
  (state: AppState) => state.userHolidays
);
