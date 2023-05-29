import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UntypedFormGroup } from '@angular/forms';
import { Store } from '@ngrx/store';
import { PasswordRequirements, Users } from 'src/app/models/Users';
import { saveSignUpState } from 'src/app/store/global/global.actions';
import {
  validateEmail,
  validatePassword,
} from '../../Algorithms/Authentication/signupvalidation';

@Component({
  selector: 'app-signup-form',
  templateUrl: './signup-form.component.html',
  styleUrls: ['./signup-form.component.scss'],
})
export class SignupFormComponent {
  // state form data
  stateFormData$ = this.globalStore.select(
    (selectSignUpInfo) => selectSignUpInfo
  );
  // form
  @Input() signUpUserForm!: UntypedFormGroup;

  @Input('formValuesToState')
  set formStateValues(userInfo: Users) {
    if (userInfo) {
      this.globalStore.dispatch(
        saveSignUpState({
          hasEditedSignUp: Object.values(userInfo).some((info) => info),
        })
      );
    }
  }
  @Input() readyToSingUp!: boolean;
  @Input() passwordValid!: PasswordRequirements;
  @Output() signUpUserData = new EventEmitter<Users>();

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
