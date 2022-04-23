import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency, ListOfCurrencies } from 'src/app/models/Currencies';
@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent {
  whatToConvertValue: number = 0;

  @Input() fromDropOpen!: boolean;
  @Input() toDropOpen!: boolean;
  @Input() fromCurrency!: Currency;
  @Input() toCurrency!: Currency;
  @Input() converstionCurrency!: number;
  @Input() listOfCurrencies!: ListOfCurrencies | null;
  @Input() gotCurrencies!: boolean | null;

  @Output() fromDropChange = new EventEmitter<boolean>();
  @Output() toDropChange = new EventEmitter<boolean>();

  @Output() selectedCurrency = new EventEmitter<Currency>();
  @Output() converting = new EventEmitter<number>();

  handleCurrencySelect(currency: Currency) {
    this.selectedCurrency.emit(currency);
  }

  convertCurrency() {
    this.converting.emit(this.whatToConvertValue);
  }

  handleFromDropChange(fromD: boolean) {
    this.fromDropChange.emit(fromD);
  }

  handleToDropChange(toD: boolean) {
    this.toDropChange.emit(toD);
  }
}
