import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard.component';
import { DashOptionsComponent } from './dash-options/dash-options.component';
import { AddItenaryComponent } from './add-itenary/add-itenary.component';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { WelcomeDashComponent } from './welcome-dash/welcome-dash.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    DashOptionsComponent,
    AddItenaryComponent,
    AddHolidayComponent,
    UpdateProfileComponent,
    WelcomeDashComponent,
  ],
  imports: [CommonModule, UserDashboardRoutingModule],
})
export class UserDashboardModule {}
