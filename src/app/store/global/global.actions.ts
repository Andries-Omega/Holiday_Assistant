import { Auth } from '@angular/fire/auth';
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
export const saveSignUpState = createAction(
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
  '[Global] get trips',
  props<{ userID: string }>()
);

export const signUp = createAction(
  '[Global] sign up user',
  props<{ userData: Users }>()
);

export const signIn = createAction(
  '[Global] sign in user',
  props<{ email: string; password: string }>()
);

export const signOutUser = createAction('[Global] signout user');
export const getUserInfo = createAction(
  '[Global] get the user information',
  props<{ userID: string }>()
);

export const updateProfile = createAction(
  '[Global] update profile',
  props<{ newUserInfo: Users; updatedLogin: boolean }>()
);

export const updateEmail = createAction(
  '[Global] update email',
  props<{ userData: Users; newPassword: string; newEmail: string }>()
);

export const updateEmailSuccess = createAction('[Global] email updated');

export const updatePassword = createAction(
  '[Global] update password',
  props<{ userData: Users; newPassword: string }>()
);

export const reAuthenticate = createAction(
  '[Global] reauthenticate user',
  props<{
    reAuthIntention: string;
    userData: Users;
    newPassword: string;
    oldPassword: string;
    email: string;
  }>()
);

export const deleteUserTrips = createAction(
  '[Global] delete user trips',
  props<{ userID: string }>()
);

export const deleteUserInfo = createAction(
  '[Global] delete user info',
  props<{ userID: string }>()
);

export const deleteUser = createAction('[Global] delete user');

export const reAuthenticateSuccess = createAction('[Global] reauthenticated');

// because on the reducer sign in, sign up, update profile, they all do the same thing(disabling loading), so this will go in any case of failure in effects
export const procedureFailure = createAction('[Global] network call Failed');

export const appendUserTrips = createAction(
  '[Global] Update user trips',
  props<{ trip: Trip }>()
);

export const removeTrip = createAction(
  '[Global] remove trip',
  props<{ tripID: string }>()
);
