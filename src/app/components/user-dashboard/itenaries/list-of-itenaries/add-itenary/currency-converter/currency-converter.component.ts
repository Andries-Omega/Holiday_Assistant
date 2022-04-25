import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Currency, ListOfCurrencies } from 'src/app/models/Currencies';
import { getCurrencies } from 'src/app/store/userdashboard/userdashboard.actions';
import { DashState } from 'src/app/store/userdashboard/userdashboard.reducer';
@Component({
  selector: 'app-currency-converter',
  templateUrl: './currency-converter.component.html',
  styleUrls: ['./currency-converter.component.scss'],
})
export class CurrencyConverterComponent implements OnInit {
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

  ngOnInit(): void {
    console.log(this.listOfCurrencies);
    if (!this.listOfCurrencies) {
      console.log('in here');
      // fetch list of currencies
      this.dashStore.dispatch(getCurrencies());
    }
  }
  constructor(private dashStore: Store<DashState>) {}
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
