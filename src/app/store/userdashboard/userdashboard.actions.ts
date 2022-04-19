import { createAction, props } from '@ngrx/store';
import { AddItenarary, Holiday } from 'src/app/models/Itenaries';

export const setIsAddingItenary = createAction(
  '[Userdashboard] Specify Whether user is currently adding itenary or not',
  props<{ isAddingItenary: AddItenarary }>()
);

export const setHolidayOfItenary = createAction(
  '[Userdashboard] setting holiday of the current itenary being added',
  props<{ holidayOfCurrentItenary: Holiday | null }>()
);
