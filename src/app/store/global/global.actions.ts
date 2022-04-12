import { createAction, props } from '@ngrx/store';
import { Users } from 'src/app/models/Users';

export const updateTheme = createAction(
  '[Global] Update Theme',
  props<{ darkMode: boolean }>()
);

export const updateThemeAfterReload = createAction(
  '[Global] Update Theme After Reload',
  props<{ darkMode: boolean }>()
);

export const saveSignUpInfo = createAction(
  '[Global] save sign up information',
  props<{ hasEditedSignUp: boolean }>()
);

export const setLoggedInUser = createAction(
  '[Global] set logged in user',
  props<{ loggedInUser: Users }>()
);
