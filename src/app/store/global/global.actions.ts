import { createAction, props } from '@ngrx/store';
import { Trip } from 'src/app/models/Itenaries';
import { Users } from 'src/app/models/Users';

export const updateTheme = createAction(
  '[Global] Update Theme',
  props<{ darkMode: boolean }>()
);

export const updateThemeAfterReload = createAction(
  '[Global] Update Theme After Reload',
  props<{ darkMode: boolean }>()
);

export const signupUser = createAction('[Global] Sign up user to firebase');
export const saveSignUpInfo = createAction(
  '[Global] save sign up information',
  props<{ hasEditedSignUp: boolean }>()
);

export const saveUserTrips = createAction(
  '[Global] save users holidays',
  props<{ userTrips: Trip[] | null }>()
);

export const setLoggedInUser = createAction(
  '[Global] set logged in user',
  props<{ loggedInUser: Users }>()
);

export const getTrips = createAction(
  '[Userdashboard] get trips',
  props<{ userID: string }>()
);
