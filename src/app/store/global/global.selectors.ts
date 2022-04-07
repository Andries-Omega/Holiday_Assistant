import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AppState, globalFeatureKey } from './global.reducer';

export const selectGlobalState =
  createFeatureSelector<AppState>(globalFeatureKey);

export const selectGlobalTheme = createSelector(
  selectGlobalState,
  (state: AppState) => state?.darkMode
);
