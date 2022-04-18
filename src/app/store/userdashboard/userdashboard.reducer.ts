import { createReducer, on } from '@ngrx/store';
import { Holiday } from 'src/app/models/Itenaries';
import {
  setHolidayOfItenary,
  setIsAddingItenary,
} from './userdashboard.actions';

export const userdashboardFeatureKey = 'userdashboard';

export interface DashState {
  isAddingItenary: boolean;
  holidayOfCurrentItenary: Holiday | null;
}

export const initialState: DashState = {
  isAddingItenary: false,
  holidayOfCurrentItenary: null,
};

const sessionDashState = sessionStorage.getItem('SavedDashState');
const savedDashState: DashState =
  sessionDashState && JSON.parse(sessionDashState);

export const reducer = createReducer(
  savedDashState || initialState,
  on(setIsAddingItenary, (state, { isAddingItenary }) => {
    const newState = {
      ...state,
      isAddingItenary,
    };
    sessionStorage.setItem('SavedDashState', JSON.stringify(newState));
    return newState;
  }),
  on(setHolidayOfItenary, (state, { holidayOfCurrentItenary }) => {
    const newState = {
      ...state,
      holidayOfCurrentItenary,
    };
    sessionStorage.setItem('SavedDashState', JSON.stringify(newState));
    return newState;
  })
);
