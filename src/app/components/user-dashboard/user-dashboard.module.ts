import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard.component';
import { DashOptionsComponent } from './dash-options/dash-options.component';

import { AddHolidayComponent } from './holidays/add-holiday/add-holiday.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { WelcomeDashComponent } from './welcome-dash/welcome-dash.component';
import { HolidaysComponent } from './holidays/holidays.component';
import { ListOfHolidaysComponent } from './holidays/list-of-holidays/list-of-holidays.component';
import { PhaseOneComponent } from './holidays/add-holiday/phase-one/phase-one.component';
import { PhaseTwoComponent } from './holidays/add-holiday/phase-two/phase-two.component';
import { PhaseThreeComponent } from './holidays/add-holiday/phase-three/phase-three.component';
import { FormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/modules/ng-zorro/ng-zorro.module';
import { HolidayComponent } from './holidays/list-of-holidays/holiday/holiday.component';
import { ItenariesComponent } from './itenaries/itenaries.component';
import { MapComponent } from './itenaries/map/map.component';
import { ListOfItenariesComponent } from './itenaries/list-of-itenaries/list-of-itenaries.component';
import { AddItenaryComponent } from './itenaries/list-of-itenaries/add-itenary/add-itenary.component';
import { CalendarComponent } from './itenaries/list-of-itenaries/calendar/calendar.component';
import { AddItenaryPopupComponent } from './itenaries/add-itenary-popup/add-itenary-popup.component';
import { GetListOfDatesPipe } from 'src/app/pipes/get-list-of-dates.pipe';
import { PhaseOneIComponent } from './itenaries/list-of-itenaries/add-itenary/phase-one-i/phase-one-i.component';
import { PhaseTwoIComponent } from './itenaries/list-of-itenaries/add-itenary/phase-two-i/phase-two-i.component';
import { CurrencyConverterComponent } from './itenaries/list-of-itenaries/add-itenary/currency-converter/currency-converter.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    DashOptionsComponent,
    AddHolidayComponent,
    UpdateProfileComponent,
    WelcomeDashComponent,
    HolidaysComponent,
    ListOfHolidaysComponent,
    PhaseOneComponent,
    PhaseTwoComponent,
    PhaseThreeComponent,
    HolidayComponent,
    ItenariesComponent,
    AddItenaryComponent,
    MapComponent,
    CalendarComponent,
    ListOfItenariesComponent,
    AddItenaryPopupComponent,
    GetListOfDatesPipe,
    PhaseOneIComponent,
    PhaseTwoIComponent,
    CurrencyConverterComponent,
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    FormsModule,
    NgZorroModule,
  ],
})
export class UserDashboardModule {}
