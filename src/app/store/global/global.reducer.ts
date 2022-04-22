import { createReducer, on } from '@ngrx/store';
import { initUsers } from 'src/app/components/Algorithms/ModelInitialisers';
import { Holiday } from 'src/app/models/Itenaries';
import { Users } from 'src/app/models/Users';
import {
  saveSignUpInfo,
  saveUserHolidays,
  setLoggedInUser,
  updateTheme,
  updateThemeAfterReload,
} from './global.actions';

export const globalFeatureKey = 'global';

export interface AppState {
  darkMode: boolean;
  hasEditedSignUp: boolean;
  loggedInUser: Users;
  userHolidays: Holiday[] | null;
}

export const defaultState: AppState = {
  darkMode: matchMedia('(prefers-color-scheme: dark)').matches,
  hasEditedSignUp: false,
  loggedInUser: initUsers(),
  userHolidays: null,
};

const sessionState = sessionStorage.getItem('SavedState');
const savedState = sessionState && JSON.parse(sessionState); // State rehydration

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
  }),
  on(saveUserHolidays, (state, { userHolidays }) => {
    const newState = {
      ...state,
      userHolidays,
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  })
);
