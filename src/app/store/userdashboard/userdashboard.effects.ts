import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { NzMessageService } from 'ng-zorro-antd/message';
import { catchError, concatMap, from, map, of, repeat } from 'rxjs';
import { Trip } from 'src/app/models/Itenaries';
import { CurrencyConvertService } from 'src/app/services/currency-convert.service';
import { ItenariesService } from 'src/app/services/itenaries.service';
import { appendUserTrips, removeTrip } from '../global/global.actions';
import { AppState } from '../global/global.reducer';
import {
  addTrip,
  deleteTrip,
  getCurrencies,
  procedureFailure,
  procedureSuccess,
  setCurrencies,
  updateTrips,
} from './userdashboard.actions';

@Injectable()
export class UserdashboardEffects {
  getCurrencies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrencies),
      concatMap(() =>
        this.currencyService.getCurrencies().pipe(
          map((currencies) => {
            this.notfication.create('success', 'Retrieved all currencies');
            return setCurrencies({ currencies });
          })
        )
      ),
      catchError(() => {
        this.notfication.create('error', 'Failed to retrieve currencies');
        return of(procedureFailure());
      }),
      repeat()
    )
  );

  addTrip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(addTrip),
      concatMap(({ tripData }) =>
        from(this.itenaryService.addNewTrip(tripData)).pipe(
          map((result: Trip) => {
            if (result) {
              this.notfication.create('success', 'added trip successfully');
              this.router.navigateByUrl('dashboard/itenaries');
              this.globalStore.dispatch(appendUserTrips({ trip: result }));
              return procedureSuccess();
            } else {
              return procedureFailure();
            }
          })
        )
      ),
      catchError(() => {
        this.notfication.create('error', 'Failed to retrieve currencies');
        return of(procedureFailure());
      }),
      repeat()
    )
  );

  deleteTrip$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteTrip),
      concatMap(({ tripID }) =>
        from(this.itenaryService.deleteTrip(tripID)).pipe(
          map(() => {
            this.notfication.create('success', 'Your trip is deleted');
            this.globalStore.dispatch(removeTrip({ tripID }));
            return procedureSuccess();
          })
        )
      ),
      catchError(() => {
        this.notfication.create('error', 'Failed to delete your trip');
        return of(procedureFailure());
      }),
      repeat()
    )
  );

  updateTrips$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateTrips),
      concatMap(({ trip }) =>
        from(this.itenaryService.updateTrip(trip)).pipe(
          map((trip) => {
            //remove the old, and add the new
            this.notfication.create('success', 'Updated trip');
            this.globalStore.dispatch(removeTrip({ tripID: trip.tripID }));
            this.globalStore.dispatch(appendUserTrips({ trip }));
            this.router.navigateByUrl('dashboard/trips'); //for view it after update reasons
            return procedureSuccess();
          })
        )
      ),
      catchError(() => {
        this.notfication.create('error', 'Failed to update your trip');
        return of(procedureFailure());
      }),
      repeat()
    )
  );
  constructor(
    private actions$: Actions,
    private currencyService: CurrencyConvertService,
    private itenaryService: ItenariesService,
    private globalStore: Store<AppState>,
    private notfication: NzMessageService,
    private router: Router
  ) {}
}
