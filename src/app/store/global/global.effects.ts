import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ItenariesService } from 'src/app/services/itenaries.service';

@Injectable()
export class GlobalEffects {
  // getTrips$ = createEffect(() =>
  //   this.actions$.pipe(
  //     ofType(getTrips),
  //     concatMap(({ userID }) =>
  //       from(this.itenaryService.getAllTrips(userID)).pipe(
  //         delay(2000), //for spinner
  //         map((trips) => saveUserTrips({ userTrips: trips }))
  //       )
  //     ),
  //     catchError(() => of(saveUserTrips({ userTrips: null })))
  //   )
  // );
  constructor(
    private actions$: Actions,
    private itenaryService: ItenariesService,
    private authService: AuthServiceService
  ) {}
}
