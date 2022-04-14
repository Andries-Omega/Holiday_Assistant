import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddHolidayComponent } from './add-holiday/add-holiday.component';
import { AddItenaryComponent } from './add-itenary/add-itenary.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UserDashboardComponent } from './user-dashboard.component';
import { WelcomeDashComponent } from './welcome-dash/welcome-dash.component';

const routes: Routes = [
  {
    path: '',
    component: UserDashboardComponent,
    children: [
      {
        path: '',
        component: WelcomeDashComponent,
      },
      {
        path: 'add-itenary',
        component: AddItenaryComponent,
      },
      {
        path: 'add-holiday',
        component: AddHolidayComponent,
      },
      {
        path: 'update-profile',
        component: UpdateProfileComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserDashboardRoutingModule {}
