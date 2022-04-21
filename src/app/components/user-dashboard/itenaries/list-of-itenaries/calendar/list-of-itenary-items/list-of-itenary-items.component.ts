import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Itenary } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-list-of-itenary-items',
  templateUrl: './list-of-itenary-items.component.html',
  styleUrls: ['./list-of-itenary-items.component.scss'],
})
export class ListOfItenaryItemsComponent {
  @Input() selectedDate!: Date | null;
  @Input() itenaries!: Itenary[];

  @Output() addNewItenary = new EventEmitter<Date>();
  @Output() closeViewOfItenararies = new EventEmitter<boolean>();
  @Output() itenaryClicked = new EventEmitter<Itenary>();

  handlecloseViewOfI() {
    this.closeViewOfItenararies.emit(false);
  }

  handleAddItenary() {
    if (this.selectedDate) {
      this.addNewItenary.emit(this.selectedDate);
    } else {
      location.reload();
    }
  }
  handleItenaryClicked(itinarary: Itenary) {
    this.itenaryClicked.emit(itinarary);
  }

  identifyItenary(index: number, itenary: Itenary) {
    return itenary;
  }

  getTime(time: string) {
    return time.substring(0, 5);
  }
}
