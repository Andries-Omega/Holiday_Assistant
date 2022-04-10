import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PasswordRequirements, Users } from 'src/app/models/Users';
import { saveSignUpInfo } from 'src/app/store/global/global.actions';
import { selectSignUpInfo } from 'src/app/store/global/global.selectors';
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
      this.signUpUserForm.get('confirmPassword')?.enabled &&
      this.signUpUserForm.value.confirmPassword &&
      this.passwordsConfirmed
    );
  }
  signUpUser() {
    this.signUpUserData.emit(this.signUpUserForm.value);
  }
}
