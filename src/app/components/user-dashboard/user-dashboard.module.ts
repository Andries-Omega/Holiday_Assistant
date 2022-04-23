import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgZorroModule } from 'src/app/modules/ng-zorro/ng-zorro.module';
import { ConvertConvertedCurrencyPipe } from 'src/app/pipes/convert-converted-currency.pipe';
import { GetDateFromStringPipe } from 'src/app/pipes/get-date-from-string.pipe';
import { GetListOfDatesPipe } from 'src/app/pipes/get-list-of-dates.pipe';
import { ListOfCurrenciesToArrPipe } from 'src/app/pipes/list-of-currencies-to-arr.pipe';
import { DashOptionsComponent } from './dash-options/dash-options.component';
import { DesktopOptionsComponent } from './dash-options/desktop-options/desktop-options.component';
import { MobileOptionsComponent } from './dash-options/mobile-options/mobile-options.component';
import { AddItenaryPopupComponent } from './itenaries/add-itenary-popup/add-itenary-popup.component';
import { ItenariesComponent } from './itenaries/itenaries.component';
import { AddItenaryComponent } from './itenaries/list-of-itenaries/add-itenary/add-itenary.component';
import { AddOrUpdateItenaryComponent } from './itenaries/list-of-itenaries/add-itenary/add-or-update-itenary/add-or-update-itenary.component';
import { ConvertCurrencySelectComponent } from './itenaries/list-of-itenaries/add-itenary/currency-converter/convert-currency-select/convert-currency-select.component';
import { CurrencyConverterComponent } from './itenaries/list-of-itenaries/add-itenary/currency-converter/currency-converter.component';
import { ListOfCurrenciesComponent } from './itenaries/list-of-itenaries/add-itenary/currency-converter/list-of-currencies/list-of-currencies.component';
import { CalendarComponent } from './itenaries/list-of-itenaries/calendar/calendar.component';
import { ListOfItenaryItemsComponent } from './itenaries/list-of-itenaries/calendar/list-of-itenary-items/list-of-itenary-items.component';
import { ListOfItenariesComponent } from './itenaries/list-of-itenaries/list-of-itenaries.component';
import { OptionsForItenaryPopUpComponent } from './itenaries/list-of-itenaries/options-for-itenary-pop-up/options-for-itenary-pop-up.component';
import { AddTripComponent } from './trips/add-trip/add-trip.component';
import { PhaseOneComponent } from './trips/add-trip/phase-one/phase-one.component';
import { PhaseThreeComponent } from './trips/add-trip/phase-three/phase-three.component';
import { PhaseTwoComponent } from './trips/add-trip/phase-two/phase-two.component';
import { ListOfTripsComponent } from './trips/list-of-trips/list-of-trips.component';
import { TripComponent } from './trips/list-of-trips/trip/trip.component';
import { TripPopUpComponent } from './trips/trip-pop-up/trip-pop-up.component';
import { TripsComponent } from './trips/trips.component';
import { UpdateProfileComponent } from './update-profile/update-profile.component';
import { UserDashboardRoutingModule } from './user-dashboard-routing.module';
import { UserDashboardComponent } from './user-dashboard.component';
import { WelcomeDashComponent } from './welcome-dash/welcome-dash.component';
import { UpdateLoginDetailsComponent } from './update-profile/update-login-details/update-login-details.component';
import { UpdateNamesComponent } from './update-profile/update-names/update-names.component';
import { UpdateProfilePasswordPopupComponent } from './update-profile/update-profile-password-popup/update-profile-password-popup.component';

@NgModule({
  declarations: [
    UserDashboardComponent,
    DashOptionsComponent,
    AddTripComponent,
    UpdateProfileComponent,
    WelcomeDashComponent,
    TripsComponent,
    ListOfTripsComponent,
    PhaseOneComponent,
    PhaseTwoComponent,
    PhaseThreeComponent,
    TripComponent,
    ItenariesComponent,
    AddItenaryComponent,
    CalendarComponent,
    ListOfItenariesComponent,
    AddItenaryPopupComponent,
    GetListOfDatesPipe,
    CurrencyConverterComponent,
    ConvertCurrencySelectComponent,
    ListOfCurrenciesComponent,
    ListOfCurrenciesToArrPipe,
    ConvertConvertedCurrencyPipe,
    OptionsForItenaryPopUpComponent,
    MobileOptionsComponent,
    DesktopOptionsComponent,
    ListOfItenaryItemsComponent,
    AddOrUpdateItenaryComponent,
    GetDateFromStringPipe,
    TripPopUpComponent,
    UpdateLoginDetailsComponent,
    UpdateNamesComponent,
    UpdateProfilePasswordPopupComponent,
  ],
  imports: [
    CommonModule,
    UserDashboardRoutingModule,
    FormsModule,
    NgZorroModule,
  ],
})
export class UserDashboardModule {}
