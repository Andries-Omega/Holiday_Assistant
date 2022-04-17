import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, concatMap } from 'rxjs/operators';
import { EMPTY, of } from 'rxjs';
import {} from './global.actions';

import { updateTheme } from './global.actions';
import { ItenariesService } from 'src/app/services/itenaries.service';

@Injectable()
export class GlobalEffects {
  constructor(
    private actions$: Actions,
    private itenaryService: ItenariesService
  ) {}
}
