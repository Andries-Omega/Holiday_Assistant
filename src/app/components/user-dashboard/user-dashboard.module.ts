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
import { AddItenaryComponent } from './itenaries/add-itenary/add-itenary.component';
import { MapComponent } from './itenaries/map/map.component';
import { CalendarComponent } from './itenaries/calendar/calendar.component';
import { ListOfItenariesComponent } from './itenaries/list-of-itenaries/list-of-itenaries.component';

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
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    FormsModule,
    NgZorroModule,
  ],
})
export class UserDashboardModule {}
