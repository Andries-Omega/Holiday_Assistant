import { createReducer, on } from '@ngrx/store';
import { updateTheme } from './global.actions';

export const globalFeatureKey = 'global';

export interface AppState {
  darkMode: boolean;
}

export const initialState: AppState = {
  darkMode: false,
};

export const reducer = createReducer(
  initialState,

  on(updateTheme, (state, { darkMode }) => ({
    ...state,
    darkMode,
  }))
);
