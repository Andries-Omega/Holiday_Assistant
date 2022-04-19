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
  @Input() selectedDate!: Date | null;
  @Input() itenaryDetails!: Itenaries;
  @Input() listOfAvailableDates!: Date[];
  @Input() startDate!: string | null;
  //For Currency
  @Input() fromDropOpen!: boolean;
  @Input() toDropOpen!: boolean;
  @Input() fromCurrency!: Currency;
  @Input() toCurrency!: Currency;
  @Input() converstionCurrency!: number;

  @Output() fromDropChange = new EventEmitter<boolean>();
  @Output() toDropChange = new EventEmitter<boolean>();
  @Output() converting = new EventEmitter<number>();
  @Output() selectedCurrency = new EventEmitter<Currency>();
  @Output() addItenaryDetails = new EventEmitter<Itenaries>();
  itenaryDate: string = new Date().toDateString();
  startTime: Date | null = null;
  endTime: Date | null = null;
  ngOnInit() {
    if (this.startDate) {
      this.itenaryDate = this.startDate;
    }
  }

  readyToAddItenary(): boolean {
    return !!(
      this.itenaryDetails.itenaryName &&
      this.selectedDate &&
      this.itenaryDetails.itenaryTag &&
      this.startTime &&
      this.endTime &&
      this.converstionCurrency &&
      this.toCurrency.code &&
      this.validTimeRange()
    );
  }

  validTimeRange(): boolean {
    if (this.startTime && this.endTime) {
      return this.endTime > this.startTime;
    } else {
      return true;
    }
  }
  handleSelectedDate() {
    this.selectedDate = new Date(this.itenaryDate);
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

  editDate() {
    this.selectedDate = null;
    this.ngOnInit();
  }

  addItenarary() {
    if (this.startTime && this.endTime && this.selectedDate) {
      this.selectedDate = new Date(this.selectedDate);
      this.itenaryDetails.itenaryDate = this.selectedDate.toDateString();
      this.itenaryDetails.itenaryStartTime = this.startTime
        ?.toTimeString()
        ?.toString();
      this.itenaryDetails.itenaryEndTime = this.endTime
        ?.toTimeString()
        ?.toString();
    }
    this.itenaryDetails.costEstimate = this.converstionCurrency;
    this.itenaryDetails.costEstimateCurrency = this.toCurrency.code;

    this.addItenaryDetails.emit(this.itenaryDetails);
  }
}
