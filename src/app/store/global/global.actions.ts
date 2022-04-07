import { createAction, props } from '@ngrx/store';

export const globalGlobals = createAction(
  '[Global] Update Theme',
  props<{ darkMode: boolean }>()
);
