import { createAction, props } from '@ngrx/store';

export const updateTheme = createAction(
  '[Global] Update Theme',
  props<{ darkMode: boolean }>()
);

export const updateThemeAfterReload = createAction(
  '[Global] Update Theme After Reload',
  props<{ darkMode: boolean }>()
);
