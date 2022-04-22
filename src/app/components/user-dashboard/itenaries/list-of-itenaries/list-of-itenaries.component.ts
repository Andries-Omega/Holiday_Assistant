import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { slide } from 'src/app/Animations/dashboard-animations';
import { getHolidayById } from 'src/app/components/Algorithms/CommonFunctions';
import { Holiday, Itenary } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-list-of-itenaries',
  templateUrl: './list-of-itenaries.component.html',
  styleUrls: ['./list-of-itenaries.component.scss'],
  animations: [slide],
})
export class ListOfItenariesComponent {
  @Input() holidays!: Holiday[] | null;
  @Input() isAddingItenary!: boolean;
  @Input() selectedDate!: Date | null;
  @Input() addIntention!: string;
  @Input() itenary!: Itenary;
  @Input() isMobileShowingItinararies!: boolean;

  @Output() changeIsAdding = new EventEmitter<boolean>();
  @Output() dateSelected = new EventEmitter<Date>();
  @Output() dateSelectedMobile = new EventEmitter<Date>();
  @Output() addItenaryDetails = new EventEmitter<Itenary>();
  @Output() holidayUpdating = new EventEmitter<Holiday>();
  @Output() itenaryClicked = new EventEmitter<Itenary>();
  @Output() closeViewOfItenararies = new EventEmitter<boolean>();
  @Output() addNewItenary = new EventEmitter<Date>();

  handleChangeIsAdding(isAdding: boolean, holidayID: string) {
    this.changeIsAdding.emit(isAdding);
    if (this.holidays) {
      this.holidayUpdating.emit(getHolidayById(holidayID, this.holidays));
    }
  }

  handleDateSelected(selectedDate: Date, holidayID: string) {
    this.dateSelected.emit(selectedDate);
    if (this.holidays) {
      this.holidayUpdating.emit(getHolidayById(holidayID, this.holidays));
    }
  }

  handleDateSelectedMobile(selectedDate: Date, holidayID: string) {
    this.dateSelectedMobile.emit(selectedDate);
    if (this.holidays) {
      this.holidayUpdating.emit(getHolidayById(holidayID, this.holidays));
    }
  }
  handleAddItenaryDetails(itenaryDetails: Itenary, holidayID: string) {
    this.addItenaryDetails.emit(itenaryDetails);
    if (this.holidays) {
      this.holidayUpdating.emit(getHolidayById(holidayID, this.holidays));
    }
  }

  handleItenaryClicked(itenary: Itenary, holidayID: string) {
    this.itenaryClicked.emit(itenary);
    if (this.holidays) {
      this.holidayUpdating.emit(getHolidayById(holidayID, this.holidays));
    }
  }

  handleCloseItinarariesMobile(open: boolean) {
    this.closeViewOfItenararies.emit(open);
  }
  handleAddNewItenaryMobile(selectedDate: Date) {
    this.addNewItenary.emit(selectedDate);
  }
  identifyHoliday(index: number, holiday: Holiday) {
    return holiday.holidayID;
  }

  isMobile(): boolean {
    return innerWidth < 670;
  }
}
