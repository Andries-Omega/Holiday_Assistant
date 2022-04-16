import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpinModule } from 'ng-zorro-antd/spin';
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzDatePickerModule,
    NzSpinModule,
  ],
  exports: [
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzModalModule,
    NzDatePickerModule,
    NzSpinModule,
  ],
})
export class NgZorroModule {}
