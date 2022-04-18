import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency, ListOfCurrencies } from 'src/app/models/Currencies';
import { CurrencyConvertService } from 'src/app/services/currency-convert.service';

@Component({
  selector: 'app-list-of-currencies',
  templateUrl: './list-of-currencies.component.html',
  styleUrls: ['./list-of-currencies.component.scss'],
})
export class ListOfCurrenciesComponent implements OnInit {
  listOfServices$!: Observable<ListOfCurrencies>;
  @Output() selectedCurrency = new EventEmitter<Currency>();
  constructor(private currencyService: CurrencyConvertService) {}

  ngOnInit(): void {
    this.listOfServices$ = this.currencyService.getCurrencies();
  }

  selectCurrency(currency: Currency) {
    this.selectedCurrency.emit(currency);
  }

  identifyCurrency(index: number, currency: Currency) {
    return currency.code;
  }
}
