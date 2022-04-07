import { createAction, props } from '@ngrx/store';

export const updateTheme = createAction(
  '[Global] Update Theme',
  props<{ darkMode: boolean }>()
);
