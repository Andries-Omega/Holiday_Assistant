import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { ItenaryItem, Trip } from 'src/app/models/Itenaries';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectUserTrips } from 'src/app/store/global/global.selectors';
import {
  deleteTrip,
  setIsAddingItenary,
  setTripFromItenary,
  updateTrips,
} from 'src/app/store/userdashboard/userdashboard.actions';
import { DashState } from 'src/app/store/userdashboard/userdashboard.reducer';
import { selectIsAddingItenary } from 'src/app/store/userdashboard/userdashboard.selectors';
import {
  getArrayWithout,
  getIndexOfItenary,
  getUserTripsFromSelect,
} from '../../Algorithms/CommonFunctions';

@Component({
  selector: 'app-itenaries',
  templateUrl: './itenaries.component.html',
  styleUrls: ['./itenaries.component.scss'],
})
export class ItenariesComponent implements OnInit {
  trips: Trip[] | null = getUserTripsFromSelect(
    this.globalStore.select(selectUserTrips)
  );

  focusedTrip!: Trip;
  isAddingItenary = this.dashStore.select(selectIsAddingItenary);

  askToAddItenary: boolean = false;
  itenaryClicked: boolean = false;
  itenary!: ItenaryItem;
  addIntention: string = 'ADDING';
  isMobileShowingItinararies: boolean = false;

  constructor(
    private globalStore: Store<AppState>,
    private dashStore: Store<DashState>,
    private confirmDelete: NzModalService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  updateIsAdding(isAddingItenary: boolean, selectedDate: Date | null) {
    this.dashStore.dispatch(
      setIsAddingItenary({
        isAddingItenary: {
          isAddingItenary,
          selectedDate,
        },
      })
    );
  }

  handleAddItenaryMobile(selectedDate: Date) {
    this.isMobileShowingItinararies = false;
    setTimeout(() => {
      this.updateIsAdding(true, selectedDate);
    }, 700);
  }
  handleDateSelected(selectedDate: Date) {
    this.updateIsAdding(false, selectedDate);
    this.askToAddItenary = true;
  }

  handleDateSelectedMobile(selectedDate: Date) {
    this.updateIsAdding(false, selectedDate);
    this.isMobileShowingItinararies = true;
  }

  handleAddItenaryFromPopup(addItenary: boolean, selectedDate: Date | null) {
    addItenary
      ? this.switchToAddItenary(selectedDate)
      : (this.askToAddItenary = false);
  }

  switchToAddItenary(selectedDate: Date | null) {
    this.updateIsAdding(true, selectedDate);
    this.askToAddItenary = false;
  }

  handleAddItenaryDetails(itenaryDetails: ItenaryItem) {
    if (this.focusedTrip) {
      if (this.addIntention === 'ADDING') {
        const newTrip = {
          ...this.focusedTrip,
          tripItenaries: [...this.focusedTrip.tripItenaries, itenaryDetails],
        };

        this.updateTrip(newTrip);
      } else {
        let index = getIndexOfItenary(
          this.itenary,
          this.focusedTrip.tripItenaries
        );

        const newTrip = {
          ...this.focusedTrip,
          tripItenaries: [
            ...getArrayWithout(index, this.itenary, this.focusedTrip),
            itenaryDetails,
          ],
        };
        this.updateTrip(newTrip);
      }
    }
  }

  handleItenaryClicked(itenary: ItenaryItem) {
    this.itenary = itenary;
    this.itenaryClicked = true;
  }

  handleUserUpdating(doing: string) {
    if (doing === 'UPDATE') {
      this.addIntention = doing;
      if (this.isMobileShowingItinararies) {
        this.isMobileShowingItinararies = false;
        setTimeout(() => {
          this.updateIsAdding(true, new Date(this.itenary.itenaryDate));
        }, 700);
      } else {
        this.updateIsAdding(true, new Date(this.itenary.itenaryDate));
      }
    } else {
      this.showItinararyDeleteConfirm();
    }
    this.itenaryClicked = false;
  }

  updateTrip(newTrip: Trip) {
    this.dashStore.dispatch(updateTrips({ trip: newTrip }));
  }

  handleUpdateTrip(trip: Trip) {
    this.globalStore.dispatch(
      setTripFromItenary({ isUpdatingFromItenaryRoute: trip })
    );
    // We don't do full Trip update in here
    this.router.navigateByUrl('/dashboard/trips');
  }

  handleDeleteTrip(trip: Trip) {
    this.focusedTrip = trip;
    this.showTripDeleteConfirm(trip);
  }

  showTripDeleteConfirm(trip: Trip) {
    this.confirmDelete.confirm({
      nzTitle: 'Are you sure delete the Trip => ' + trip.tripName,
      nzContent: '<b style="color: red;">You will not get it back</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteTrip(trip),
      nzCancelText: 'No',
      nzOnCancel: () => this.confirmDelete.closeAll(),
    });
  }

  showItinararyDeleteConfirm() {
    this.confirmDelete.confirm({
      nzTitle:
        'Are you sure delete the itinarary => ' + this.itenary.itenaryName,
      nzContent: '<b style="color: red;">You will not get it back</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteItenarary(),
      nzCancelText: 'No',
      nzOnCancel: () => this.confirmDelete.closeAll(),
    });
  }

  deleteTrip(trip: Trip) {
    this.dashStore.dispatch(deleteTrip({ tripID: trip.tripID }));
  }

  deleteItenarary() {
    const newTrip = {
      ...this.focusedTrip,
      tripItenaries: [
        ...getArrayWithout(
          getIndexOfItenary(this.itenary, this.focusedTrip.tripItenaries),
          this.itenary,
          this.focusedTrip
        ),
      ],
    };
    this.updateTrip(newTrip);
  }
}
