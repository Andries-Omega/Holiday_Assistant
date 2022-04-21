import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Currency } from 'src/app/models/Currencies';
import { Itenary } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-add-or-update-itenary',
  templateUrl: './add-or-update-itenary.component.html',
  styleUrls: ['./add-or-update-itenary.component.scss'],
})
export class AddOrUpdateItenaryComponent implements OnInit {
  // For entire Form
  @Input() selectedDate!: Date | null;
  @Input() itenaryDetails!: Itenary;
  @Input() listOfAvailableDates!: Date[];
  @Input() startDate!: string | null;
  @Input() addIntention!: string;
  //For Currency
  @Input() fromDropOpen!: boolean;
  @Input() toDropOpen!: boolean;
  @Input() fromCurrency!: Currency;
  @Input() toCurrency!: Currency;
  @Input() converstionCurrency!: number;
  @Input() itenary!: Itenary;

  @Output() fromDropChange = new EventEmitter<boolean>();
  @Output() toDropChange = new EventEmitter<boolean>();
  @Output() converting = new EventEmitter<number>();
  @Output() selectedCurrency = new EventEmitter<Currency>();
  @Output() addItenaryDetails = new EventEmitter<Itenary>();

  itenaryDate: string = new Date().toDateString();

  startTime: Date | null = null;
  endTime: Date | null = null;
  ngOnInit() {
    if (this.startDate) {
      this.itenaryDate = this.itenary?.itenaryDate || this.startDate;
    }
  }

  readyToAddItenary(): boolean {
    return !!(
      this.itenaryDetails.itenaryName &&
      this.selectedDate &&
      this.itenaryDetails.itenaryTag &&
      this.startTime &&
      this.endTime &&
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
    this.itenaryDetails.costEstimate = this.converstionCurrency || 3;
    this.itenaryDetails.costEstimateCurrency = this.toCurrency.code || 'ZAR';

    this.addItenaryDetails.emit(this.itenaryDetails);
  }
}
