import { createReducer, on } from '@ngrx/store';
import { initUsers } from 'src/app/components/Algorithms/ModelInitialisers';
import { Trip } from 'src/app/models/Itenaries';
import { Users } from 'src/app/models/Users';
import {
  appendUserTrips,
  deleteUser,
  deleteUserInfo,
  deleteUserTrips,
  getTrips,
  getUserInfo,
  procedureFailure,
  reAuthenticate,
  reAuthenticateSuccess,
  removeTrip,
  saveSignUpState,
  saveUserTrips,
  setLoggedInUser,
  signIn,
  signOutUser,
  signUp,
  updateEmail,
  updateEmailSuccess,
  updatePassword,
  updateProfile,
  updateTheme,
  updateThemeAfterReload,
} from './global.actions';

export const globalFeatureKey = 'global';

export interface AppState {
  darkMode: boolean;
  hasEditedSignUp: boolean;
  loggedInUser: Users;
  userTrips: Trip[] | null;
  isLoading: boolean;
  loadingMessage: '';
}

export const defaultState: AppState = {
  darkMode: matchMedia('(prefers-color-scheme: dark)').matches,
  hasEditedSignUp: false,
  loggedInUser: initUsers(),
  userTrips: null,
  isLoading: false,
  loadingMessage: '',
};

let sessionState = sessionStorage.getItem('SavedState');
let savedState = sessionState && JSON.parse(sessionState); // State rehydration

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
  on(saveSignUpState, (state, { hasEditedSignUp }) => {
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
      isLoading: false,
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(saveUserTrips, (state, { userTrips }) => {
    const newState = {
      ...state,
      isLoading: false,
      userTrips,
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(getTrips, (state) => {
    const newState = {
      ...state,
      isLoading: true,
      loadingMessage: 'Adding User Trips...',
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(signUp, (state) => {
    const newState = {
      ...state,
      isLoading: true,
      loadingMessage: 'Signing Up...',
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(signIn, (state) => {
    const newState = {
      ...state,
      isLoading: true,
      loadingMessage: 'Signing In...',
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(signOutUser, (state) => {
    const newState = {
      ...state,
      loggedInUser: initUsers(),
      isLoading: 'false',
      userTrips: null,
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(getUserInfo, (state) => {
    const newState = {
      ...state,
      isLoading: true,
      loadingMessage: 'Getting Your Information...',
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(updateProfile, (state) => {
    const newState = {
      ...state,
      isLoading: true,
      loadingMessage: 'Updating Profile...',
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(updateEmail, (state) => {
    const newState = {
      ...state,
      loadingMessage: 'Updating Email...',
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(updateEmailSuccess, (state) => {
    const newState = {
      ...state,
      isLoading: false,
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(updatePassword, (state) => {
    const newState = {
      ...state,
      loadingMessage: 'Updating password...',
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(reAuthenticate, (state) => {
    const newState = {
      ...state,
      isLoading: true,
      loadingMessage: 'Re Authenticating...',
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(reAuthenticateSuccess, (state) => {
    const newState = {
      ...state,
      isLoading: false,
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(deleteUserTrips, (state) => {
    const newState = {
      ...state,
      isLoading: true,
      loadingMessage: 'Deleting User trips...',
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(deleteUserInfo, (state) => {
    const newState = {
      ...state,
      isLoading: true,
      loadingMessage: 'Deleting User Information...',
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(deleteUser, (state) => {
    const newState = {
      ...state,
      isLoading: true,
      loadingMessage: 'Deleting User...',
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(appendUserTrips, (state, { trip }) => {
    const newState = {
      ...state,
      isLoading: false,
      userTrips: [...state.userTrips, trip],
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(removeTrip, (state, { tripID }) => {
    const newState = {
      ...state,
      isLoading: false,
      userTrips: state.userTrips.filter((t: Trip) => t.tripID !== tripID),
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  }),
  on(procedureFailure, (state) => {
    const newState = {
      ...state,
      isLoading: false,
    };
    sessionStorage.setItem('SavedState', JSON.stringify(newState));
    return newState;
  })
);
