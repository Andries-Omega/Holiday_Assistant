import { createReducer, on } from '@ngrx/store';
import { Holiday, AddItenarary } from 'src/app/models/Itenaries';
import {
  setHolidayOfItenary,
  setIsAddingItenary,
} from './userdashboard.actions';

export const userdashboardFeatureKey = 'userdashboard';

export interface DashState {
  isAddingItenary: AddItenarary;
  holidayOfCurrentItenary: Holiday | null;
}

export const initialState: DashState = {
  isAddingItenary: { isAddingItenary: false, selectedDate: null },
  holidayOfCurrentItenary: null,
};

export const reducer = createReducer(
  initialState,
  on(setIsAddingItenary, (state, { isAddingItenary }) => ({
    ...state,
    isAddingItenary,
  })),
  on(setHolidayOfItenary, (state, { holidayOfCurrentItenary }) => ({
    ...state,
    holidayOfCurrentItenary,
  }))
);
