import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageComponent } from './components/no-page/no-page.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { CanAccessSignInOrUpGuard } from './guards/can-access-sign-in-or-up.guard';
import { CanLeaveSignupGuard } from './guards/can-leave-signup.guard';
import { DashboardGuard } from './guards/dashboard.guard';

const routes: Routes = [
  {
    path: 'signin',
    component: SigninComponent,
    canActivate: [CanAccessSignInOrUpGuard],
  },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [CanAccessSignInOrUpGuard],
    canDeactivate: [CanLeaveSignupGuard],
  },
  {
    path: '',
    redirectTo: '/signin',
    pathMatch: 'full',
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./components/user-dashboard/user-dashboard.module').then(
        (m) => m.UserDashboardModule
      ),
    canActivate: [DashboardGuard],
  },
  {
    path: '**',
    component: NoPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
