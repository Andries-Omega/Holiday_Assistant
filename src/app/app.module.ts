import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common-components/header/header.component';
import { GuideComponent } from './components/common-components/guide/guide.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollUpComponent } from './components/common-components/scroll-up/scroll-up.component';
import { HomeComponent } from './components/home/home.component';
import { NoPageComponent } from './components/no-page/no-page.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { SignupDesktopComponent } from './components/signup/signup-desktop/signup-desktop.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GuideComponent,
    ScrollUpComponent,
    HomeComponent,
    SigninComponent,
    SignupComponent,
    NoPageComponent,
    SigninComponent,
    SignupComponent,
    SignupDesktopComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
