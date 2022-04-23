import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { sizeAnime } from 'src/app/Animations/dashboard-animations';
import { Users } from 'src/app/models/Users';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectLoggedInUser } from 'src/app/store/global/global.selectors';
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

  constructor(private globalStore: Store<AppState>) {}

  ngOnInit(): void {
    this.enteredName = this.user.name;
    this.enteredPreferredName = this.user.preferredName;
    this.enteredEmail = this.user.email;
  }

  checkMobile(): boolean {
    return isMobile();
  }

  updateProfile(password: string) {
    this.promptUserForPassword = false;
    console.log('Name ', this.enteredName, this.user.name);
    console.log('PName ', this.enteredPreferredName, this.user.preferredName);
    console.log('Email ', this.enteredEmail, this.user.email);
    console.log('Password ', this.enteredPassword);
  }
}
