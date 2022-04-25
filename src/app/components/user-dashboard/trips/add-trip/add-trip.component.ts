import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { fade, slide } from 'src/app/Animations/dashboard-animations';
import { getUserFromSelect } from 'src/app/components/Algorithms/CommonFunctions';
import { Location, Trip } from 'src/app/models/Itenaries';
import { Users } from 'src/app/models/Users';
import { LocationService } from 'src/app/services/location.service';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectLoggedInUser } from 'src/app/store/global/global.selectors';
import {
  addTrip,
  updateTrips,
} from 'src/app/store/userdashboard/userdashboard.actions';
import { DashState } from 'src/app/store/userdashboard/userdashboard.reducer';

@Component({
  selector: 'app-add-trip',
  templateUrl: './add-trip.component.html',
  styleUrls: ['./add-trip.component.scss'],
  animations: [fade, slide],
})
export class AddTripComponent implements OnInit {
  @Input() addingIntentions!: string;
  @Input() theTrip!: Trip | null;

  phase: number = 0;
  errorMessage: string = '';
  locationDetails$!: Observable<Location>;
  isSearchingLocation: boolean = false;

  user: Users = getUserFromSelect(this.globalStore.select(selectLoggedInUser));

  isAddingTrip: boolean = false;
  tip: string = 'Adding Trip...';

  tripDetails: Trip = {
    tripID: '',
    userID: this.user.userID,
    tripName: '',
    tripLocation: null,
    tripStartDate: '',
    tripEndDate: '',
    tripItenaries: [],
  };

  @Output() closeAdding = new EventEmitter<void>();

  constructor(
    private locationService: LocationService,
    private globalStore: Store<AppState>,
    private dashStore: Store<DashState>
  ) {}

  ngOnInit(): void {}

  next() {
    this.phase >= 2 ? this.addTrip() : this.phase++;
  }

  previous() {
    this.phase <= 0 ? (this.phase = 0) : this.phase--;
  }

  isNextDisabled(): boolean {
    switch (this.phase) {
      case 0:
        return (
          (!!this.tripDetails.tripName && !this.isAddingTrip) ||
          !!this.theTrip?.tripName
        );
      case 1:
        return !!(
          (this.tripDetails.tripLocation &&
            this.tripDetails.tripName &&
            !this.isAddingTrip) ||
          !!this.theTrip?.tripLocation
        );
      case 2:
        return !!(
          (this.tripDetails.tripEndDate &&
            this.tripDetails.tripStartDate &&
            this.tripDetails.tripName &&
            this.tripDetails.tripLocation &&
            !this.isAddingTrip) ||
          !!(this.theTrip?.tripStartDate && this.theTrip.tripEndDate)
        );
      default:
        return false;
    }
  }

  searchForLocation(pName: string) {
    if (this.theTrip) {
      this.theTrip = { ...this.theTrip, tripLocation: null };
    }
    this.tripDetails.tripLocation = null;
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
      this.tripDetails.tripStartDate = sDates[0].toDateString();
      this.tripDetails.tripEndDate = sDates[1].toDateString();
    } else {
      this.errorMessage =
        'Please ensure non of the dates are previous days, and end date is in the future.';
      this.tripDetails.tripStartDate = '';
      this.tripDetails.tripEndDate = '';
    }
  }

  setTripLocation(location: Location) {
    this.tripDetails.tripLocation = location;
    if (this.theTrip) {
      this.theTrip = { ...this.theTrip, tripLocation: location };
    }
  }

  validateDate(sDates: Date[]): boolean {
    return (
      new Date(sDates[0].toDateString()) >=
        new Date(new Date().toDateString()) &&
      new Date(sDates[1].toDateString()) >
        new Date(new Date().toDateString()) &&
      new Date(sDates[1].toDateString()) > new Date(sDates[0].toDateString())
    );
  }

  addTrip() {
    this.phase = 2; // just ensure it doesn't exit 2.
    if (this.addingIntentions === 'ADDING') {
      this.dashStore.dispatch(addTrip({ tripData: this.tripDetails }));
    } else {
      //then update

      const updatedTrip = this.createUpdatedObject();

      if (updatedTrip) {
        this.dashStore.dispatch(updateTrips({ trip: updatedTrip }));
      } else {
        this.errorMessage = 'Failed To Update Trip';
        this.isAddingTrip = false;
      }
      this.closeAdding.emit(); // no need for adding, it get's re routed to itenaries after add
    }
  }

  createUpdatedObject(): Trip | null {
    if (this.theTrip) {
      return {
        ...this.theTrip,
        tripName: this.tripDetails.tripName || this.theTrip?.tripName,
        tripLocation:
          this.tripDetails.tripLocation || this.theTrip.tripLocation,
        tripStartDate:
          this.tripDetails.tripStartDate || this.theTrip.tripStartDate,
        tripEndDate: this.tripDetails.tripEndDate || this.theTrip.tripEndDate,
      };
    } else {
      return null;
    }
  }
}
