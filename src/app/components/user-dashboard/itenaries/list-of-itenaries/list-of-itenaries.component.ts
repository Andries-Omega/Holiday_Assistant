import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Holiday } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-list-of-itenaries',
  templateUrl: './list-of-itenaries.component.html',
  styleUrls: ['./list-of-itenaries.component.scss'],
})
export class ListOfItenariesComponent {
  @Input() holidays!: Holiday[] | null;
  @Input() isAddingItenary!: boolean | null;

  @Output() changeIsAdding = new EventEmitter<boolean>();
  @Output() dateSelected = new EventEmitter<Date>();

  handleChangeIsAdding(isAdding: boolean) {
    this.changeIsAdding.emit(isAdding);
  }

  handleDateSelected(selectedDate: Date) {
    this.dateSelected.emit(selectedDate);
  }
}
