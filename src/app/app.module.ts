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
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LightswitchComponent } from './components/common-components/lightswitch/lightswitch.component';
import { NgZorroModule } from './modules/ng-zorro/ng-zorro.module';

registerLocaleData(en);

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
    LightswitchComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    NgZorroModule,
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
