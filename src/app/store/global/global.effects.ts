import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { Observable, EMPTY, of } from 'rxjs';

import * as GlobalActions from './global.actions';



@Injectable()
export class GlobalEffects {

  globalGlobals$ = createEffect(() => {
    return this.actions$.pipe( 

      ofType(GlobalActions.globalGlobals),
      concatMap(() =>
        /** An EMPTY observable only emits completion. Replace with your own observable API request */
        EMPTY.pipe(
          map(data => GlobalActions.globalGlobalsSuccess({ data })),
          catchError(error => of(GlobalActions.globalGlobalsFailure({ error }))))
      )
    );
  });



  constructor(private actions$: Actions) {}

}
