import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency, ListOfCurrencies } from 'src/app/models/Currencies';
import { Holiday, Itenaries } from 'src/app/models/Itenaries';
import { CurrencyConvertService } from 'src/app/services/currency-convert.service';

@Component({
  selector: 'app-add-itenary',
  templateUrl: './add-itenary.component.html',
  styleUrls: ['./add-itenary.component.scss'],
})
export class AddItenaryComponent {
  @Input() isAddingItenary!: boolean | null;
  @Input() selectedDate!: Date | null;
  @Input() holiday!: Holiday;
  @Input() itenary!: Itenaries;
  @Input() addIntention!: string;
  @Output() addItenaryDetails = new EventEmitter<Itenaries>();

  dropDownOpen = false;
  fromDropOpen: boolean = false;
  toDropOpen: boolean = false;
  fromCurrency: Currency = { code: 'USD', value: 1 };
  toCurrency: Currency = { code: 'ZAR', value: 14 };

  converstionCurrency$!: Observable<ListOfCurrencies>;

  constructor(private currencyService: CurrencyConvertService) {}

  currentPhase: number = 0;

  itenaryDetails: Itenaries = {
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

  handleAddItenaryDetails(itenaryDetails: Itenaries) {
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
