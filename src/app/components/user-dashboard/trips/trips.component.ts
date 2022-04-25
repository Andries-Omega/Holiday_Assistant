import { Component, OnInit } from '@angular/core';
import { select, Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { fade } from 'src/app/Animations/dashboard-animations';
import { Trip } from 'src/app/models/Itenaries';
import { saveUserTrips } from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import {
  selectLoggedInUser,
  selectUserTrips,
} from 'src/app/store/global/global.selectors';
import {
  deleteTrip,
  setTripFromItenary,
} from 'src/app/store/userdashboard/userdashboard.actions';
import { DashState } from 'src/app/store/userdashboard/userdashboard.reducer';
import {
  selectIsLoading,
  selectIsUpdatingTripFromI,
  selectLoadingMessage,
} from 'src/app/store/userdashboard/userdashboard.selectors';
import {
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
  fadeView: string = 'Out';

  isAddingTrip: boolean = false;
  isViewingTrip: boolean = false;
  addingTrip: boolean = false;
  addingIntentions: string = 'ADDING';
  selectedTrip!: Trip | null;
  isTripOptionsClicked: boolean = false;
  processingDeleteOrUpdate: boolean = false;

  isLoading = this.dashStore.pipe(select(selectIsLoading));
  isLoadingMessage = this.dashStore.pipe(select(selectLoadingMessage));

  trips$ = this.globalStore.pipe(select(selectUserTrips));

  trips = getUserTripsFromSelect(this.trips$);

  user = getUserFromSelect(this.globalStore.select(selectLoggedInUser));

  isUpdatingTripFromI: Trip | null = null;
  constructor(
    private globalStore: Store<AppState>,
    private confirmDelete: NzModalService,
    private dashStore: Store<DashState>
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
      this.addToList();
    } else if (this.isViewingTrip) {
      this.viewToList();
    } else {
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

  listToView() {
    this.fadeList = 'Out';
    setTimeout(() => {
      this.isViewingTrip = true;
      this.fadeView = 'In';
    }, 1000);
  }
  viewToList() {
    this.fadeView = 'Out';
    setTimeout(() => {
      this.isViewingTrip = false;
      this.fadeList = 'In';
    }, 1000);
  }
  handleTripClicked(trip: Trip) {
    this.selectedTrip = trip;
    this.isTripOptionsClicked = true;
  }
  handleUserTripOption(doing: string) {
    this.isTripOptionsClicked = false;
    if (doing === 'DELETE') {
      this.showHolidayDeleteConfirm();
    } else if (doing === 'UPDATE') {
      this.initiateUpdate();
    } else {
      this.listToView();
    }
  }

  initiateUpdate() {
    this.addingIntentions = 'UPDATING';
    this.listToAdd();
  }

  deleteTrip() {
    if (this.selectedTrip) {
      this.dashStore.dispatch(
        deleteTrip({ tripID: this.selectedTrip?.tripID })
      );
    }
    this.isTripOptionsClicked = false;
  }

  showHolidayDeleteConfirm() {
    this.confirmDelete.confirm({
      nzTitle:
        'Are you sure delete the holiday = ' + this.selectedTrip?.tripName,
      nzContent: '<b style="color: red;">You will not get it back</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteTrip(),
      nzCancelText: 'No',
      nzOnCancel: () => this.confirmDelete.closeAll(),
    });
  }
}
