import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Holiday, Itenaries } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-list-of-itenaries',
  templateUrl: './list-of-itenaries.component.html',
  styleUrls: ['./list-of-itenaries.component.scss'],
})
export class ListOfItenariesComponent {
  @Input() holidays!: Holiday[] | null;
  @Input() isAddingItenary!: boolean;
  @Input() selectedDate!: Date | null;

  @Output() changeIsAdding = new EventEmitter<boolean>();
  @Output() dateSelected = new EventEmitter<Date>();
  @Output() addItenaryDetails = new EventEmitter<Itenaries>();

  handleChangeIsAdding(isAdding: boolean) {
    this.changeIsAdding.emit(isAdding);
  }

  handleDateSelected(selectedDate: Date) {
    this.dateSelected.emit(selectedDate);
  }

  handleAddItenaryDetails(itenaryDetails: Itenaries) {
    this.addItenaryDetails.emit(itenaryDetails);
  }

  identifyHoliday(index: number, holiday: Holiday) {
    return holiday.holidayID;
  }
}
