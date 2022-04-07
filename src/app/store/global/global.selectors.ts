import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromGlobal from './global.reducer';

export const selectGlobalState = createFeatureSelector<fromGlobal.State>(
  fromGlobal.globalFeatureKey
);
