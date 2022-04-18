import { createAction, props } from '@ngrx/store';
import { Holiday } from 'src/app/models/Itenaries';

export const setIsAddingItenary = createAction(
  '[Userdashboard] Specify Whether user is currently adding itenary or not',
  props<{ isAddingItenary: boolean }>()
);

export const setHolidayOfItenary = createAction(
  '[Userdashboard] setting holiday of the current itenary being added',
  props<{ holidayOfCurrentItenary: Holiday | null }>()
);
