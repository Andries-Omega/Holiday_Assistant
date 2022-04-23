import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, concatMap, map, of } from 'rxjs';
import { CurrencyConvertService } from 'src/app/services/currency-convert.service';
import { LocationService } from 'src/app/services/location.service';
import {
  getCurrencies,
  setCurrencies,
  setCurrencyAPIStatus,
} from './userdashboard.actions';

@Injectable()
export class UserdashboardEffects {
  getCurrencies$ = createEffect(() =>
    this.actions$.pipe(
      ofType(getCurrencies),
      concatMap(() =>
        this.currencyService.getCurrencies().pipe(
          map((currencies) => setCurrencies({ currencies })),
          catchError(() =>
            of(setCurrencyAPIStatus({ currencyAPIRateExceeded: true }))
          )
        )
      )
    )
  );

  constructor(
    private actions$: Actions,
    private currencyService: CurrencyConvertService
  ) {}
}
