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

export const defaultState: AppState = {
  darkMode: matchMedia('(prefers-color-scheme: dark)').matches,
  hasEditedSignUp: false,
  loggedInUser: initUsers(),
};

const sessionState = sessionStorage.getItem('SavedState');
const savedState = sessionState && JSON.parse(sessionState);
console.log(savedState || defaultState);
export const reducer = createReducer(
  savedState || defaultState,
  on(updateTheme, updateThemeAfterReload, (state, { darkMode }) => {
    const newState = {
      ...state,
      darkMode,
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(saveSignUpInfo, (state, { hasEditedSignUp }) => {
    const newState = {
      ...state,
      hasEditedSignUp,
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(setLoggedInUser, (state, { loggedInUser }) => {
    const newState = {
      ...state,
      loggedInUser,
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  })
);
