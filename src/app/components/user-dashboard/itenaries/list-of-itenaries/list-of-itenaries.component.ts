import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { slide } from 'src/app/Animations/dashboard-animations';
import { isMobile } from 'src/app/components/Algorithms/CommonFunctions';
import { Trip, ItenaryItem } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-list-of-itenaries',
  templateUrl: './list-of-itenaries.component.html',
  styleUrls: ['./list-of-itenaries.component.scss'],
  animations: [slide],
})
export class ListOfItenariesComponent {
  @Input() trips!: Trip[] | null;
  @Input() isAddingItenary!: boolean;
  @Input() selectedDate!: Date | null;
  @Input() addIntention!: string;
  @Input() itenary!: ItenaryItem;
  @Input() isMobileShowingItinararies!: boolean;

  @Output() changeIsAdding = new EventEmitter<boolean>();
  @Output() dateSelected = new EventEmitter<Date>();
  @Output() dateSelectedMobile = new EventEmitter<Date>();
  @Output() addItenaryDetails = new EventEmitter<ItenaryItem>();
  @Output() tripUpdating = new EventEmitter<Trip>();
  @Output() updateTrip = new EventEmitter<Trip>();
  @Output() deleteTrip = new EventEmitter<Trip>();
  @Output() itenaryClicked = new EventEmitter<ItenaryItem>();
  @Output() closeViewOfItenararies = new EventEmitter<boolean>();
  @Output() addNewItenary = new EventEmitter<Date>();

  handleChangeIsAdding(isAdding: boolean, trip: Trip) {
    this.changeIsAdding.emit(isAdding);
    if (this.trips) {
      this.tripUpdating.emit(trip);
    }
  }

  handleDateSelected(selectedDate: Date, trip: Trip) {
    this.dateSelected.emit(selectedDate);
    if (this.trips) {
      this.tripUpdating.emit(trip);
    }
  }

  handleDateSelectedMobile(selectedDate: Date, trip: Trip) {
    this.dateSelectedMobile.emit(selectedDate);
    if (this.trips) {
      this.tripUpdating.emit(trip);
    }
  }
  handleAddItenaryDetails(itenaryDetails: ItenaryItem, trip: Trip) {
    this.addItenaryDetails.emit(itenaryDetails);
    if (this.trips) {
      this.tripUpdating.emit(trip);
    }
  }

  handleItenaryClicked(itenary: ItenaryItem, trip: Trip) {
    this.itenaryClicked.emit(itenary);
    if (this.trips) {
      this.tripUpdating.emit(trip);
    }
  }

  handleUpdateTrip(trip: Trip) {
    this.updateTrip.emit(trip);
  }

  handleDeleteTrip(trip: Trip) {
    this.deleteTrip.emit(trip);
  }
  handleCloseItinarariesMobile(open: boolean) {
    this.closeViewOfItenararies.emit(open);
  }
  handleAddNewItenaryMobile(selectedDate: Date) {
    this.addNewItenary.emit(selectedDate);
  }
  identifyTrip(index: number, trip: Trip) {
    return trip.tripID;
  }

  checkMobile(): boolean {
    return isMobile();
  }
}
