import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HolidaysComponent } from './holidays/holidays.component';
import { ItenariesComponent } from './itenaries/itenaries.component';
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
        path: 'itenaries',
        component: ItenariesComponent,
      },
      {
        path: 'holidays',
        component: HolidaysComponent,
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
