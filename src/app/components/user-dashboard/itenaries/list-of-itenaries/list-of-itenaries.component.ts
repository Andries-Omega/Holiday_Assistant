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
  @Output() updateHoliday = new EventEmitter<Holiday>();
  @Output() deleteHoliday = new EventEmitter<Holiday>();
  @Output() itenaryClicked = new EventEmitter<Itenary>();
  @Output() closeViewOfItenararies = new EventEmitter<boolean>();
  @Output() addNewItenary = new EventEmitter<Date>();

  handleChangeIsAdding(isAdding: boolean, holiday: Holiday) {
    this.changeIsAdding.emit(isAdding);
    if (this.holidays) {
      this.holidayUpdating.emit(holiday);
    }
  }

  handleDateSelected(selectedDate: Date, holiday: Holiday) {
    this.dateSelected.emit(selectedDate);
    if (this.holidays) {
      this.holidayUpdating.emit(holiday);
    }
  }

  handleDateSelectedMobile(selectedDate: Date, holiday: Holiday) {
    this.dateSelectedMobile.emit(selectedDate);
    if (this.holidays) {
      this.holidayUpdating.emit(holiday);
    }
  }
  handleAddItenaryDetails(itenaryDetails: Itenary, holiday: Holiday) {
    this.addItenaryDetails.emit(itenaryDetails);
    if (this.holidays) {
      this.holidayUpdating.emit(holiday);
    }
  }

  handleItenaryClicked(itenary: Itenary, holiday: Holiday) {
    this.itenaryClicked.emit(itenary);
    if (this.holidays) {
      this.holidayUpdating.emit(holiday);
    }
  }

  handleUpdateHoliday(holiday: Holiday) {
    this.updateHoliday.emit(holiday);
  }

  handleDeleteHoliday(holiday: Holiday) {
    this.deleteHoliday.emit(holiday);
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
