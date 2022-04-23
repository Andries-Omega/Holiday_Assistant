import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Currency, ListOfCurrencies } from 'src/app/models/Currencies';

@Component({
  selector: 'app-list-of-currencies',
  templateUrl: './list-of-currencies.component.html',
  styleUrls: ['./list-of-currencies.component.scss'],
})
export class ListOfCurrenciesComponent {
  @Input() listOfCurrencies!: ListOfCurrencies | null;
  @Output() selectedCurrency = new EventEmitter<Currency>();

  selectCurrency(currency: Currency) {
    this.selectedCurrency.emit(currency);
  }

  identifyCurrency(index: number, currency: Currency) {
    return currency.code;
  }
}
