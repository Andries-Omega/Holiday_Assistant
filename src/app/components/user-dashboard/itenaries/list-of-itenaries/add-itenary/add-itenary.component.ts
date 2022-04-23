import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { slide } from 'src/app/Animations/dashboard-animations';
import { Currency, ListOfCurrencies } from 'src/app/models/Currencies';
import { Trip, Itenary } from 'src/app/models/Itenaries';
import { CurrencyConvertService } from 'src/app/services/currency-convert.service';
import { getCurrencies } from 'src/app/store/userdashboard/userdashboard.actions';
import { DashState } from 'src/app/store/userdashboard/userdashboard.reducer';
import {
  selectCurrencies,
  selectCurrenciesAPIStatus,
} from 'src/app/store/userdashboard/userdashboard.selectors';

@Component({
  selector: 'app-add-itenary',
  templateUrl: './add-itenary.component.html',
  styleUrls: ['./add-itenary.component.scss'],
})
export class AddItenaryComponent implements OnInit {
  @Input() isAddingItenary!: boolean | null;
  @Input() selectedDate!: Date | null;
  @Input() trip!: Trip;
  @Input() itenary!: Itenary;
  @Input() addIntention!: string;
  @Output() addItenaryDetails = new EventEmitter<Itenary>();

  dropDownOpen = false;
  fromDropOpen: boolean = false;
  toDropOpen: boolean = false;
  fromCurrency: Currency = { code: 'USD', value: 1 };
  toCurrency: Currency = { code: 'ZAR', value: 14 };

  listOfCurrencies$!: Observable<ListOfCurrencies>;
  gotCurrencies$!: Observable<boolean>;
  converstionCurrency$!: Observable<ListOfCurrencies>;

  constructor(
    private currencyService: CurrencyConvertService,
    private dashStore: Store<DashState>
  ) {}
  ngOnInit(): void {
    // fetch list of currencies
    if (!this.listOfCurrencies$) {
      this.dashStore.dispatch(getCurrencies());
      this.listOfCurrencies$ = this.dashStore.pipe(select(selectCurrencies));
      this.gotCurrencies$ = this.dashStore.pipe(
        select(selectCurrenciesAPIStatus)
      );
    }
  }

  currentPhase: number = 0;

  itenaryDetails: Itenary = {
    itenaryName: this.itenary?.itenaryName || '',
    itenaryTag: this.itenary?.itenaryTag || '',
    itenaryDate: this.itenary?.itenaryDate || '',
    itenaryStartTime: this.itenary?.itenaryStartTime || '',
    itenaryEndTime: this.itenary?.itenaryEndTime || '',
    costEstimate: this.itenary?.costEstimate || 0,
    costEstimateCurrency: this.itenary?.costEstimateCurrency || '',
  };

  handleCurrencySelect(currency: Currency) {
    if (this.fromDropOpen) {
      this.fromCurrency = currency;
      this.fromDropOpen = false;
    } else {
      // if this functions runs then one of the drop downs MUST be open
      this.toCurrency = currency;
      this.toDropOpen = false;
    }
  }

  handleAddItenaryDetails(itenaryDetails: Itenary) {
    this.addItenaryDetails.emit(itenaryDetails);
  }

  convertCurrency(whatToConvertValue: number) {
    if (whatToConvertValue) {
      this.converstionCurrency$ = this.currencyService.convertCurrency(
        whatToConvertValue,
        this.fromCurrency.code,
        this.toCurrency.code
      );
    }
  }
}
