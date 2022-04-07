import { Action, createReducer, on } from '@ngrx/store';
import * as GlobalActions from './global.actions';

export const globalFeatureKey = 'global';

export interface AppState {
  darkMode: boolean;
}

export const initialState: AppState = {
  darkMode: false,
};

export const reducer = createReducer(
  initialState,

  on(GlobalActions.globalGlobals, (state) => state)
);
