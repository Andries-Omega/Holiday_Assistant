import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { Currency, ListOfCurrencies } from 'src/app/models/Currencies';
import { Itenaries } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-phase-one-i',
  templateUrl: './phase-one-i.component.html',
  styleUrls: ['./phase-one-i.component.scss'],
})
export class PhaseOneIComponent implements OnInit {
  // For entire Form
  @Input() selectedDate!: string;
  @Input() itenaryDetails!: Itenaries;
  @Input() listOfAvailableDates!: Date[];
  @Input() startDate!: string | null;
  //For Currency
  @Input() fromDropOpen!: boolean;
  @Input() toDropOpen!: boolean;
  @Input() fromCurrency!: Currency;
  @Input() toCurrency!: Currency;
  @Input() converstionCurrency$!: Observable<ListOfCurrencies>;

  @Output() fromDropChange = new EventEmitter<boolean>();
  @Output() toDropChange = new EventEmitter<boolean>();
  @Output() converting = new EventEmitter<number>();
  @Output() selectedCurrency = new EventEmitter<Currency>();

  itenaryDate: string = new Date().toDateString();
  startTime: Date | null = null;
  endTime: Date | null = null;
  ngOnInit() {
    if (this.startDate) {
      this.itenaryDate = this.startDate;
    }
  }
  handleSelectedDate() {
    this.selectedDate = this.itenaryDate;
    console.log(this.itenaryDate);
  }

  getDateString(date: Date): string {
    return date.toDateString();
  }

  handleCurrencySelect(currency: Currency) {
    this.selectedCurrency.emit(currency);
  }
  handleConverting(whatToConvert: number) {
    this.converting.emit(whatToConvert);
  }

  handleFromDropChange(fromD: boolean) {
    this.fromDropChange.emit(fromD);
  }

  handleToDropChange(toD: boolean) {
    this.toDropChange.emit(toD);
  }
}
