import { createReducer, on } from '@ngrx/store';
import { initUsers } from 'src/app/components/Algorithms/CommonFunctions';
import { Users } from 'src/app/models/Users';
import {
  saveSignUpInfo,
  setLoggedInUser,
  updateTheme,
  updateThemeAfterReload,
} from './global.actions';

export const globalFeatureKey = 'global';

export interface AppState {
  darkMode: boolean;
  hasEditedSignUp: boolean;
  loggedInUser: Users;
}

export const initialState: AppState = {
  darkMode: matchMedia('(prefers-color-scheme: dark)').matches,
  hasEditedSignUp: false,
  loggedInUser: initUsers(),
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
  })),
  on(setLoggedInUser, (state, { loggedInUser }) => ({
    ...state,
    loggedInUser,
  }))
);
