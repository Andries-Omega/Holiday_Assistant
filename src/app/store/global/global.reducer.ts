import { createReducer, on } from '@ngrx/store';
import { updateTheme, updateThemeAfterReload } from './global.actions';

export const globalFeatureKey = 'global';

export interface AppState {
  darkMode: boolean;
}

export const initialState: AppState = {
  darkMode: matchMedia('(prefers-color-scheme: dark)').matches,
};

export const reducer = createReducer(
  initialState,
  on(updateTheme, updateThemeAfterReload, (state, { darkMode }) => ({
    ...state,
    darkMode,
  }))
);
