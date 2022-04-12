import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PasswordRequirements, Users } from 'src/app/models/Users';
import { saveSignUpInfo } from 'src/app/store/global/global.actions';

import {
  validateEmail,
  validatePassword,
} from '../../Algorithms/Authentication/signupvalidation';

@Component({
  selector: 'app-signup-desktop',
  templateUrl: './signup-desktop.component.html',
  styleUrls: ['./signup-desktop.component.scss'],
})
export class SignupDesktopComponent {
  // state form data
  stateFormData$ = this.globalStore.select(
    (selectSignUpInfo) => selectSignUpInfo
  );
  // form
  @Input() signUpUserForm!: FormGroup;
  @Input('formValuesToState')
  set formStateValues(userInfo: Users) {
    if (userInfo) {
      this.globalStore.dispatch(
        saveSignUpInfo({
          hasEditedSignUp: Object.values(userInfo).some((info) => info),
        })
      );
    }
  }
  @Input() readyToSingUp!: boolean;
  @Input() errorMessage!: string;
  @Output() signUpUserData = new EventEmitter<Users>();

  passwordValid: PasswordRequirements = {
    lengthValid: false,
    upperCaseValid: false,
    lowerCaseValid: false,
    charactersValid: false,
    numbersValid: false,
  };
  passwordsConfirmed: boolean = false;

  // passwords visibility
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  constructor(private globalStore: Store) {}
  verifyEmail() {
    return validateEmail(this.signUpUserForm.value.email);
  }

  verifyPassword() {
    this.passwordValid = validatePassword(this.signUpUserForm.value.password);
    return Object.values(this.passwordValid).every((value) => value);
  }

  submitSignUpReady() {
    return (
      this.signUpUserForm.get('email')?.enabled &&
      this.signUpUserForm.get('password')?.enabled &&
      this.signUpUserForm.get('confirmPassword')?.enabled &&
      this.signUpUserForm.value.confirmPassword &&
      this.passwordsConfirmed
    );
  }
  signUpUser() {
    this.signUpUserData.emit(this.signUpUserForm.value);
  }
}
