import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';

import { AuthServiceService } from 'src/app/services/auth-service.service';
import { ItenariesService } from 'src/app/services/itenaries.service';

@Injectable()
export class GlobalEffects {
  constructor(
    private actions$: Actions,
    private itenaryService: ItenariesService,
    private authService: AuthServiceService
  ) {}
}
