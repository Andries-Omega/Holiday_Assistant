import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StoreModule } from '@ngrx/store';
import * as fromGlobal from '../../store/global/global.reducer';
import { EffectsModule } from '@ngrx/effects';
import { GlobalEffects } from '../../store/global/global.effects';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    StoreModule.forFeature(fromGlobal.globalFeatureKey, fromGlobal.reducer),
    EffectsModule.forFeature([GlobalEffects])
  ]
})
export class StatemanagementModule { }
