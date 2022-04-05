import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/common-components/header/header.component';
import { GuideComponent } from './components/common-components/guide/guide.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ScrollUpComponent } from './components/common-components/scroll-up/scroll-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    GuideComponent,
    ScrollUpComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, FontAwesomeModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
