import { Component, OnInit } from '@angular/core';
import { User } from '@angular/fire/auth';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { PasswordRequirements, Users } from 'src/app/models/Users';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import {
  saveSignUpInfo,
  setLoggedInUser,
} from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectSignUpInfo } from 'src/app/store/global/global.selectors';
import { signIn } from '../Algorithms/Authentication/authetication';

import { firstSignIn } from '../Algorithms/Authentication/signPurgatory';
import {
  validateEmail,
  validatePassword,
} from '../Algorithms/Authentication/signupvalidation';
import { saveUserToSessionStorage } from '../Algorithms/CommonFunctions';

interface cowKeep {
  k: string;
  of: string;
  w?: string;
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  theSignUpState$ = this.globalStore.select(selectSignUpInfo);
  errorMessage: string = '';
  readyToSingUp: boolean = false;
  stop$ = new Subject<void>();
  // form
  signUpUserForm!: FormGroup;

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
  constructor(
    private formBuilder: FormBuilder,
    private globalStore: Store<AppState>,
    private authService: AuthServiceService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signUpUserForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      preferredName: [''],
      email: [
        { value: '', disabled: true },
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
      password: [
        { value: '', disabled: true },
        [Validators.required, Validators.minLength(6)],
      ],
      confirmPassword: [
        {
          value: '',
          disabled: true,
        },
        [Validators.required, Validators.minLength(6)],
      ],
    });
  }

  verifyEmail() {
    return validateEmail(this.signUpUserForm.value.email);
  }

  verifyPassword() {
    this.passwordValid = validatePassword(this.signUpUserForm.value.password);
    return Object.values(this.passwordValid).every((value) => value);
  }

  submitSignUpReady() {
    this.readyToSingUp =
      this.signUpUserForm.get('email')?.enabled &&
      this.signUpUserForm.get('confirmPassword')?.enabled &&
      this.signUpUserForm.value.confirmPassword &&
      this.passwordsConfirmed;
  }

  signUpUser(userData: Users) {
    this.authService
      .signUpUser(userData)
      .then((r: string | boolean) => {
        this.errorMessage = '';
        if (typeof r !== 'boolean') {
          //signIn(r, this.globalStore, this.route);
          console.log(r);
        } else {
        }
      })
      .catch((err: Error) => {
        console.log('err');
        this.errorMessage =
          err.message ===
          'FirebaseError: Firebase: Error (auth/email-already-in-use).'
            ? 'The email you have provided already exists'
            : 'error occured while signing you, please try again';
      });
  }
}
