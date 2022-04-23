import { createReducer, on } from '@ngrx/store';
import { initUsers } from 'src/app/components/Algorithms/ModelInitialisers';
import { Trip } from 'src/app/models/Itenaries';
import { Users } from 'src/app/models/Users';
import {
  saveSignUpInfo,
  saveUserTrips,
  setLoggedInUser,
  updateTheme,
  updateThemeAfterReload,
} from './global.actions';

export const globalFeatureKey = 'global';

export interface AppState {
  darkMode: boolean;
  hasEditedSignUp: boolean;
  loggedInUser: Users;
  userTrips: Trip[] | null;
}

export const defaultState: AppState = {
  darkMode: matchMedia('(prefers-color-scheme: dark)').matches,
  hasEditedSignUp: false,
  loggedInUser: initUsers(),
  userTrips: null,
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
  on(saveUserTrips, (state, { userTrips }) => {
    const newState = {
      ...state,
      userTrips,
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  })
);
