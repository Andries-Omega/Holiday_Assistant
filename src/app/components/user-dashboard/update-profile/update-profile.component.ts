import { Component, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { NzModalService } from 'ng-zorro-antd/modal';
import { sizeAnime } from 'src/app/Animations/dashboard-animations';
import { Users } from 'src/app/models/Users';
import {
  reAuthenticate,
  updateProfile,
} from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectLoggedInUser } from 'src/app/store/global/global.selectors';
import { getUserFromSelect, isMobile } from '../../Algorithms/CommonFunctions';
import { initUsers } from '../../Algorithms/ModelInitialisers';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
  animations: [sizeAnime],
})
export class UpdateProfileComponent implements OnInit {
  isUpdatingLoginDetails: boolean = false;
  promptUserForPassword: boolean = false;
  enteredPreferredName: string = '';
  enteredName: string = '';
  enteredEmail: string = '';
  enteredPassword: string = '';
  user$ = this.globalStore.select(selectLoggedInUser);
  user: Users = initUsers();

  errorMessage: string = '';
  reAuthIntention: string = 'Update';

  constructor(
    private globalStore: Store<AppState>,
    private auth: Auth,
    private confirmDelete: NzModalService
  ) {}

  ngOnInit(): void {
    this.user = getUserFromSelect(this.user$);
    this.enteredName = this.user.name;
    this.enteredPreferredName = this.user.preferredName;
    this.enteredEmail = this.user.email;
  }

  checkMobile(): boolean {
    return isMobile();
  }

  updateUser() {
    this.reAuthIntention = 'Update';
    // if they are updating email or password, we reauthenticate
    if (this.somethingChanged()) {
      this.errorMessage = '';
      if (this.updatingLoginDetails()) {
        this.promptUserForPassword = true;
      } else {
        this.updateProfile();
      }
    } else {
      this.errorMessage = 'There is nothing to change 🤷';
    }
  }

  fullUpdate(password: string) {
    this.promptUserForPassword = false;
    this.reAuthenticate(password);
  }

  /**
   * So the rule here is that if we are reauthenticating, then we are making a full update ().
   */
  reAuthenticate(oldPassword: string) {
    let newUserInfo: Users = {
      email: this.enteredEmail,
      name: this.enteredName,
      preferredName: this.enteredPreferredName,
      userID: this.user.userID,
    };

    let reAuthData = {
      reAuthIntention: this.reAuthIntention,
      userData: newUserInfo,
      newPassword: this.enteredPassword,
      oldPassword,
      email: this.auth.currentUser?.email || this.user.email,
    };
    this.globalStore.dispatch(reAuthenticate(reAuthData));
  }

  updateProfile() {
    let newUserInfo: Users = {
      email: this.enteredEmail,
      name: this.enteredName,
      preferredName: this.enteredPreferredName,
      userID: this.user.userID,
    };

    this.globalStore.dispatch(
      updateProfile({ newUserInfo, updatedLogin: this.updatingLoginDetails() })
    );
  }
  handleDeleteUser() {
    this.reAuthIntention = 'Delete';
    this.showUserDeleteConfirm();
  }

  somethingChanged() {
    return !(
      this.enteredName === this.user.name &&
      this.enteredEmail === this.user.email &&
      this.enteredPreferredName === this.user.preferredName &&
      !this.enteredPassword
    );
  }

  updatingLoginDetails(): boolean {
    return !!this.enteredPassword || this.enteredEmail !== this.user.email;
  }

  showUserDeleteConfirm() {
    this.confirmDelete.confirm({
      nzTitle: 'Are you sure delete the your account',
      nzContent: '<b style="color: red;">You will not get it back</b>',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => (this.promptUserForPassword = true),
      nzCancelText: 'No',
      nzOnCancel: () => this.confirmDelete.closeAll(),
    });
  }
}
