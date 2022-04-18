import { createReducer, on } from '@ngrx/store';
import { Holiday } from 'src/app/models/Itenaries';
import * as UserdashboardActions from './userdashboard.actions';

export const userdashboardFeatureKey = 'userdashboard';

export interface DashState {
  isAddingItenary: boolean;
  holidayOfCurrentItenary: Holiday | null;
}

export const initialState: DashState = {
  isAddingItenary: false,
  holidayOfCurrentItenary: null,
};

export const reducer = createReducer(initialState);
