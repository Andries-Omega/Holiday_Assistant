import { Component, OnInit } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { sizeAnime } from 'src/app/Animations/dashboard-animations';
import { Users } from 'src/app/models/Users';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { setLoggedInUser } from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectLoggedInUser } from 'src/app/store/global/global.selectors';
import { signOutt } from '../../Algorithms/Authentication/authetication';
import { getUserFromSelect, isMobile } from '../../Algorithms/CommonFunctions';

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
  user: Users = getUserFromSelect(this.user$);
  errorMessage: string = '';
  isUpdating: boolean = false;
  updateTip: string = '';

  constructor(
    private globalStore: Store<AppState>,
    private authService: AuthServiceService,
    private auth: Auth
  ) {}

  ngOnInit(): void {
    this.enteredName = this.user.name;
    this.enteredPreferredName = this.user.preferredName;
    this.enteredEmail = this.user.email;
  }

  checkMobile(): boolean {
    return isMobile();
  }
  updateUser() {
    // if they are updating email or password, we reauthenticate
    if (this.somethingChanged()) {
      this.errorMessage = '';
      if (this.updatingLoginDetails()) {
        this.promptUserForPassword = true;
      } else {
        this.isUpdating = true;
        this.updateProfile();
      }
    } else {
      this.errorMessage = 'There is nothing to change 🤷';
    }
  }

  fullUpdate(password: string) {
    this.promptUserForPassword = false;
    this.isUpdating = true;
    this.reAuthenticate(password);
  }

  /**
   * So the rule here is that if we are reauthenticating, then we are making a full update ('That's why profile runs last, because it does not start anything else').
   */
  reAuthenticate(oldPassword: string) {
    this.updateTip = 'Re Authenticating...';
    this.authService
      .reAuthenticate(oldPassword, this.user.email)
      .then((authenticated) => {
        if (authenticated) {
          this.updateEmail();
        } else {
          this.isUpdating = false;
          this.errorMessage = 'Unable to verify password';
        }
      })
      .catch(() => {
        this.isUpdating = false;
        this.errorMessage = 'Something went wrong....';
      });
  }

  updateEmail() {
    this.updateTip = 'Updating Email...';
    this.authService
      .updateEmail(this.enteredEmail)
      .then((updatedemail) => {
        if (updatedemail) {
          // because it is possible that they are updating email but not password, so we don't want to send blank password to firebase
          if (this.enteredPassword) {
            this.updatePassword();
          } else {
            this.updateProfile();
          }
        } else {
          this.isUpdating = false;
          this.errorMessage = 'Failed To Update Email ';
        }
      })
      .catch(() => {
        this.isUpdating = false;
        this.errorMessage = 'Something went wrong....';
      });
  }

  updatePassword() {
    this.updateTip = 'Updating Password...';
    this.authService
      .updatePassword(this.enteredPassword)
      .then((updatedpassword) => {
        if (updatedpassword) {
          this.updateProfile();
        } else {
          this.isUpdating = false;
          // because it is very passible you updated email, but then password update failed
          this.errorMessage =
            'Failed To Update Password, NB: Your New Email is ' +
            this.enteredEmail;
        }
      })
      .catch(() => {
        this.isUpdating = false;
        this.errorMessage = 'Something went wrong....';
      });
  }

  updateProfile() {
    this.updateTip = 'Updating Profile...';
    this.authService
      .updateUserProfile(
        this.enteredEmail,
        this.enteredName,
        this.enteredPreferredName,
        this.user.userID
      )
      .then((updatedProfile) => {
        if (updatedProfile) {
          // if they updated login details, they get to login again.
          if (this.updatingLoginDetails()) {
            //just so they can know their sign out is not a mistake
            this.updateTip = 'Signing Out...';
            setTimeout(() => {
              signOutt(this.auth, this.globalStore);
            }, 1000); // and also because the average human reading speed is 4.5 words per second ( so i am giving them a lil extra time)
          } else {
            //else, just reset their user details to force second phase of sign in and get new details from firebase
            const newUserInfo: Users = {
              userID: this.user.userID,
              name: '',
              email: '',
              preferredName: '',
            };
            this.globalStore.dispatch(
              setLoggedInUser({ loggedInUser: newUserInfo })
            );
            //reload to ensure ngOnInit of dashboard runs
            location.reload();
          }
        } else {
          this.isUpdating = false;
          this.errorMessage = 'Failed To Update Profile';
        }
      })
      .catch(() => {
        this.isUpdating = false;
        this.errorMessage = 'Something went wrong, please try again 😬';
      });
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
}
