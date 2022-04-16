import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { map, Observable } from 'rxjs';
import { fade, slide } from 'src/app/Animations/dashboard-animations';
import { getUserFromSelect } from 'src/app/components/Algorithms/CommonFunctions';
import { Holiday, Location } from 'src/app/models/Itenaries';
import { Users } from 'src/app/models/Users';
import { ItenariesService } from 'src/app/services/itenaries.service';
import { LocationService } from 'src/app/services/location.service';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectLoggedInUser } from 'src/app/store/global/global.selectors';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.scss'],
  animations: [fade, slide],
})
export class AddHolidayComponent implements OnInit {
  phase: number = 0;
  errorMessage: string = '';
  locationDetails$!: Observable<Location>;
  isSearchingLocation: boolean = false;

  user: Users = getUserFromSelect(this.globalStore.select(selectLoggedInUser));

  isAddingHoliday: boolean = false;

  holidayDetails: Holiday = {
    userID: this.user.userID,
    holidayName: '',
    holidayLocation: null,
    holidayStartDate: null,
    holidayEndDate: null,
    holidayItenaries: [],
  };

  constructor(
    private locationService: LocationService,
    private itenaryService: ItenariesService,
    private globalStore: Store<AppState>
  ) {}

  ngOnInit(): void {}

  next() {
    this.phase >= 2 ? this.addHoliday() : this.phase++;
  }

  previous() {
    this.phase <= 0 ? (this.phase = 0) : this.phase--;
  }

  isNextDisabled(): boolean {
    switch (this.phase) {
      case 0:
        return !!this.holidayDetails.holidayName && !this.isAddingHoliday;
      case 1:
        return !!(
          this.holidayDetails.holidayLocation &&
          this.holidayDetails.holidayName &&
          !this.isAddingHoliday
        );
      case 2:
        return !!(
          this.holidayDetails.holidayEndDate &&
          this.holidayDetails.holidayStartDate &&
          this.holidayDetails.holidayName &&
          this.holidayDetails.holidayLocation &&
          !this.isAddingHoliday
        );
      default:
        return false;
    }
  }

  searchForLocation(pName: string) {
    if (pName) {
      this.errorMessage = '';
      this.isSearchingLocation = true;
      this.locationDetails$ = this.locationService.getLocationInfo(pName, 'en');
    } else {
      this.errorMessage = 'Please provide something to search for';
    }
  }

  setSelectedDates(sDates: Date[]) {
    if (this.validateDate(sDates)) {
      this.errorMessage = '';
      this.holidayDetails.holidayStartDate = sDates[0];
      this.holidayDetails.holidayEndDate = sDates[1];
    } else {
      this.errorMessage =
        'Please ensure non of the dates are previous days, and end date is in the future.';
      this.holidayDetails.holidayStartDate = null;
      this.holidayDetails.holidayEndDate = null;
    }
  }

  validateDate(sDates: Date[]): boolean {
    console.log(
      new Date(sDates[0].toDateString()) >= new Date(new Date().toDateString())
    );
    return (
      new Date(sDates[0].toDateString()) >=
        new Date(new Date().toDateString()) &&
      new Date(sDates[1].toDateString()) >
        new Date(new Date().toDateString()) &&
      new Date(sDates[1].toDateString()) > new Date(sDates[0].toDateString())
    );
  }

  addHoliday() {
    this.phase = 2; // just ensure it doesn't exit 2.
    this.isAddingHoliday = true;
    // Add To Database
    this.itenaryService.addNewHoliday(this.holidayDetails).then(() => {
      location.reload();
    });
  }
}
