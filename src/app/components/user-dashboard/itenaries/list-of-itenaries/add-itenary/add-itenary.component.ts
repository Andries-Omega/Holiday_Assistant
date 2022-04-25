import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Currency, ListOfCurrencies } from 'src/app/models/Currencies';
import { ItenaryItem, Trip } from 'src/app/models/Itenaries';
import { CurrencyConvertService } from 'src/app/services/currency-convert.service';
import { DashState } from 'src/app/store/userdashboard/userdashboard.reducer';
import { selectCurrencies } from 'src/app/store/userdashboard/userdashboard.selectors';

@Component({
  selector: 'app-add-itenary',
  templateUrl: './add-itenary.component.html',
  styleUrls: ['./add-itenary.component.scss'],
})
export class AddItenaryComponent implements OnInit {
  @Input() isAddingItenary!: boolean | null;
  @Input() selectedDate!: Date | null;
  @Input() trip!: Trip;
  @Input() itenary!: ItenaryItem;
  @Input() addIntention!: string;
  @Output() addItenaryDetails = new EventEmitter<ItenaryItem>();

  dropDownOpen = false;
  fromDropOpen: boolean = false;
  toDropOpen: boolean = false;
  fromCurrency: Currency = { code: 'USD', value: 1 };
  toCurrency: Currency = { code: 'ZAR', value: 14 };

  listOfCurrencies$ = this.dashStore.select(selectCurrencies);

  gotCurrencies$!: Observable<boolean>;
  converstionCurrency$!: Observable<ListOfCurrencies>;

  currentPhase: number = 0;

  itenaryDetails: ItenaryItem = {
    itenaryName: this.itenary?.itenaryName || '',
    itenaryTag: this.itenary?.itenaryTag || '',
    itenaryDate: this.itenary?.itenaryDate || '',
    itenaryStartTime: this.itenary?.itenaryStartTime || '',
    itenaryEndTime: this.itenary?.itenaryEndTime || '',
    costEstimate: this.itenary?.costEstimate || 0,
    costEstimateCurrency: this.itenary?.costEstimateCurrency || '',
  };

  constructor(
    private currencyService: CurrencyConvertService,
    private dashStore: Store<DashState>
  ) {}
  ngOnInit(): void {}

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

  handleAddItenaryDetails(itenaryDetails: ItenaryItem) {
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
