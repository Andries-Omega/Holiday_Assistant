import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import en from '@angular/common/locales/en';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { en_US, NZ_I18N } from 'ng-zorro-antd/i18n';
import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common-components/header/header.component';
import { ScrollUpComponent } from './components/common-components/scroll-up/scroll-up.component';
import { NoPageComponent } from './components/no-page/no-page.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupFormComponent } from './components/signup/signup-form/signup-form.component';
import { SignupComponent } from './components/signup/signup.component';
import { NgZorroModule } from './modules/ng-zorro/ng-zorro.module';
import { GlobalEffects } from './store/global/global.effects';
import { globalFeatureKey, reducer } from './store/global/global.reducer';
import { UserdashboardEffects } from './store/userdashboard/userdashboard.effects';
import * as fromUserdashboard from './store/userdashboard/userdashboard.reducer';
import { NgxsModule } from '@ngxs/store';
import { GlobalState } from './store/global-two/global.state';

registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ScrollUpComponent,
    SigninComponent,
    SignupComponent,
    NoPageComponent,
    SigninComponent,
    SignupComponent,
    SignupFormComponent,
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
    StoreModule.forRoot({}, {}),
    StoreModule.forFeature(globalFeatureKey, reducer),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    EffectsModule.forRoot([GlobalEffects, UserdashboardEffects]),

    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
    StoreModule.forFeature(
      fromUserdashboard.userdashboardFeatureKey,
      fromUserdashboard.reducer
    ),
    EffectsModule.forFeature([UserdashboardEffects]),
    NgxsModule.forRoot([GlobalState], {
      developmentMode: !environment.production,
    }),
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent],
})
export class AppModule {}
