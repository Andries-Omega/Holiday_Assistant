import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzCalendarModule } from 'ng-zorro-antd/calendar';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzTimePickerModule } from 'ng-zorro-antd/time-picker';
import { NzMessageModule } from 'ng-zorro-antd/message';
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
    NzCalendarModule,
    NzSelectModule,
    NzTimePickerModule,
    NzMessageModule,
  ],
  exports: [
    NzModalModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzModalModule,
    NzDatePickerModule,
    NzSpinModule,
    NzCalendarModule,
    NzSelectModule,
    NzTimePickerModule,
    NzMessageModule,
  ],
})
export class NgZorroModule {}
