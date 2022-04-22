import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { iif, Observable } from 'rxjs';
import { fade, slide } from 'src/app/Animations/dashboard-animations';
import {
  forceHolidaysRefetch,
  getUserFromSelect,
} from 'src/app/components/Algorithms/CommonFunctions';
import { Holiday, Location } from 'src/app/models/Itenaries';
import { Users } from 'src/app/models/Users';
import { ItenariesService } from 'src/app/services/itenaries.service';
import { LocationService } from 'src/app/services/location.service';
import { saveUserHolidays } from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectLoggedInUser } from 'src/app/store/global/global.selectors';

@Component({
  selector: 'app-add-holiday',
  templateUrl: './add-holiday.component.html',
  styleUrls: ['./add-holiday.component.scss'],
  animations: [fade, slide],
})
export class AddHolidayComponent implements OnInit {
  @Input() addingIntentions!: string;
  @Input() theHoliday!: Holiday | null;

  phase: number = 0;
  errorMessage: string = '';
  locationDetails$!: Observable<Location>;
  isSearchingLocation: boolean = false;

  user: Users = getUserFromSelect(this.globalStore.select(selectLoggedInUser));

  isAddingHoliday: boolean = false;
  tip: string = 'Adding Holiday...';

  holidayDetails: Holiday = {
    holidayID: '',
    userID: this.user.userID,
    holidayName: '',
    holidayLocation: null,
    holidayStartDate: '',
    holidayEndDate: '',
    holidayItenaries: [],
  };

  @Output() newHoliday = new EventEmitter<Holiday>();

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
        return (
          (!!this.holidayDetails.holidayName && !this.isAddingHoliday) ||
          !!this.theHoliday?.holidayName
        );
      case 1:
        return !!(
          (this.holidayDetails.holidayLocation &&
            this.holidayDetails.holidayName &&
            !this.isAddingHoliday) ||
          !!this.theHoliday?.holidayLocation
        );
      case 2:
        return !!(
          (this.holidayDetails.holidayEndDate &&
            this.holidayDetails.holidayStartDate &&
            this.holidayDetails.holidayName &&
            this.holidayDetails.holidayLocation &&
            !this.isAddingHoliday) ||
          !!(
            this.theHoliday?.holidayStartDate && this.theHoliday.holidayEndDate
          )
        );
      default:
        return false;
    }
  }

  searchForLocation(pName: string) {
    if (this.theHoliday) {
      this.theHoliday = { ...this.theHoliday, holidayLocation: null };
    }
    this.holidayDetails.holidayLocation = null;
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
      this.holidayDetails.holidayStartDate = sDates[0].toDateString();
      this.holidayDetails.holidayEndDate = sDates[1].toDateString();
    } else {
      this.errorMessage =
        'Please ensure non of the dates are previous days, and end date is in the future.';
      this.holidayDetails.holidayStartDate = '';
      this.holidayDetails.holidayEndDate = '';
    }
  }

  setHolidayLocation(location: Location) {
    this.holidayDetails.holidayLocation = location;
    if (this.theHoliday) {
      this.theHoliday = { ...this.theHoliday, holidayLocation: location };
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
    if (this.addingIntentions === 'ADDING') {
      this.isAddingHoliday = true;
      // Add To Database
      this.itenaryService
        .addNewHoliday(this.holidayDetails)
        .then((details: Holiday) => {
          // send it to holidays so state can be updated with new holiday
          this.newHoliday.emit(details);
        });
    } else {
      //then update
      this.isAddingHoliday = true;
      this.tip = 'Updating Holiday...';
      const updatedHoliday = this.createUpdatedObject();
      if (updatedHoliday) {
        this.itenaryService
          .updateHoliday(updatedHoliday)
          .then(() => {
            forceHolidaysRefetch(this.globalStore);
          })
          .catch(() => (this.isAddingHoliday = false));
      } else {
        this.errorMessage = 'Failed To Update Holiday';
        this.isAddingHoliday = false;
      }
    }
  }

  createUpdatedObject(): Holiday | null {
    if (this.theHoliday) {
      return {
        ...this.theHoliday,
        holidayName:
          this.holidayDetails.holidayName || this.theHoliday?.holidayName,
        holidayLocation:
          this.holidayDetails.holidayLocation ||
          this.theHoliday.holidayLocation,
        holidayStartDate:
          this.holidayDetails.holidayStartDate ||
          this.theHoliday.holidayStartDate,
        holidayEndDate:
          this.holidayDetails.holidayEndDate || this.theHoliday.holidayEndDate,
      };
    } else {
      return null;
    }
  }
}
