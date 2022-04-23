import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { fade } from 'src/app/Animations/dashboard-animations';
import { Trip } from 'src/app/models/Itenaries';
import { ItenariesService } from 'src/app/services/itenaries.service';
import { saveUserTrips } from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import {
  selectLoggedInUser,
  selectUserTrips,
} from 'src/app/store/global/global.selectors';
import { setTripFromItenary } from 'src/app/store/userdashboard/userdashboard.actions';
import { selectIsUpdatingTripFromI } from 'src/app/store/userdashboard/userdashboard.selectors';
import {
  forceTripsRefetch,
  getIsUpdatingTripFromItenaryFromSelect,
  getUserFromSelect,
  getUserTripsFromSelect,
} from '../../Algorithms/CommonFunctions';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.scss'],
  animations: [fade],
})
export class TripsComponent implements OnInit {
  fadeList: string = 'In';
  fadeAdd: string = 'Out';

  isAddingTrip: boolean = false;
  addingTrip: boolean = false;
  addingIntentions: string = 'ADDING';
  selectedTrip!: Trip | null;
  isTripOptionsClicked: boolean = false;
  processingDeleteOrUpdate: boolean = false;

  trips = getUserTripsFromSelect(this.globalStore.select(selectUserTrips));
  user = getUserFromSelect(this.globalStore.select(selectLoggedInUser));
  isUpdatingTripFromI: Trip | null = null;
  constructor(
    private globalStore: Store<AppState>,
    private itenaryService: ItenariesService
  ) {}

  ngOnInit(): void {
    this.isUpdatingTripFromI = getIsUpdatingTripFromItenaryFromSelect(
      this.globalStore.select(selectIsUpdatingTripFromI)
    );
    if (this.isUpdatingTripFromI) {
      //then initiate update
      this.selectedTrip = this.isUpdatingTripFromI;
      this.initiateUpdate();
      //and reset to avoid always being send to adding
      this.globalStore.dispatch(
        setTripFromItenary({ isUpdatingFromItenaryRoute: null })
      );
    }
  }

  /**
   * Doing this so i can have smooth transition between showing list of TripsuserTrips and adding new trip
   */
  handleSwitchComponents() {
    if (this.isAddingTrip) {
      // then we entering lists
      this.addToList();
    } else {
      // then we entering add
      this.listToAdd();
    }
  }

  updateListOfUserTrips(trip: Trip) {
    if (this.trips) {
      let newTripsuserTrips = [...this.trips, trip];
      this.globalStore.dispatch(
        saveUserTrips({ userTrips: newTripsuserTrips })
      );
      location.reload();
    } else {
      location.reload();
    }
  }
  addToList() {
    this.fadeAdd = 'Out'; // Initiate fade out animation
    setTimeout(() => {
      // waiting for the fade animation
      this.isAddingTrip = false;
      this.fadeList = 'In'; // Initiate fade in animation
      this.addingIntentions = 'ADDING'; // make sure the default intentions are to add a new one
      this.selectedTrip = null;
    }, 1000);
  }

  listToAdd() {
    this.fadeList = 'Out';
    setTimeout(() => {
      this.isAddingTrip = true;
      this.fadeAdd = 'In';
    }, 1000);
  }

  handleTripClicked(trip: Trip) {
    this.selectedTrip = trip;
    this.isTripOptionsClicked = true;
  }
  handleUserTripOption(doing: string) {
    if (doing === 'UPDATE') {
      this.initiateUpdate();
    } else {
      this.deleteTrip();
    }
  }

  initiateUpdate() {
    this.addingIntentions = 'UPDATING';
    this.listToAdd();
  }

  deleteTrip() {
    if (this.selectedTrip) {
      this.processingDeleteOrUpdate = true;
      this.itenaryService
        .deleteTrip(this.selectedTrip?.tripID)
        .then(() => {
          forceTripsRefetch(this.globalStore);
        })
        .catch(() => (this.processingDeleteOrUpdate = false));
    }
    this.isTripOptionsClicked = false;
  }
}
