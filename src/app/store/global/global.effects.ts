import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';

import { updateTheme } from './global.actions';

@Injectable()
export class GlobalEffects {
  constructor(private actions$: Actions) {}
}
