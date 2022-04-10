import { createReducer, on } from '@ngrx/store';
import { Users } from 'src/app/models/Users';
import {
  saveSignUpInfo,
  updateTheme,
  updateThemeAfterReload,
} from './global.actions';

export const globalFeatureKey = 'global';

export interface AppState {
  darkMode: boolean;
  hasEditedSignUp: boolean;
}

export const initialState: AppState = {
  darkMode: matchMedia('(prefers-color-scheme: dark)').matches,
  hasEditedSignUp: false,
};

export const reducer = createReducer(
  initialState,
  on(updateTheme, updateThemeAfterReload, (state, { darkMode }) => ({
    ...state,
    darkMode,
  })),
  on(saveSignUpInfo, (state, { hasEditedSignUp }) => ({
    ...state,
    hasEditedSignUp,
  }))
);
