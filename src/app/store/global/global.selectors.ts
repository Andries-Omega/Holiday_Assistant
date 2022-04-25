import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, globalFeatureKey } from './global.reducer';

export const selectGlobalState =
  createFeatureSelector<AppState>(globalFeatureKey);

export const selectSignUpInfo = createSelector(
  selectGlobalState,
  (state: AppState) => state?.hasEditedSignUp
);

export const selectLoggedInUser = createSelector(
  selectGlobalState,
  (state: AppState) => state.loggedInUser
);

export const selectUserTrips = createSelector(
  selectGlobalState,
  (state: AppState) => state.userTrips
);

export const selectIsLoading = createSelector(
  selectGlobalState,
  (state: AppState) => state.isLoading
);

export const selectLoadingMessage = createSelector(
  selectGlobalState,
  (state: AppState) => state.loadingMessage
);
