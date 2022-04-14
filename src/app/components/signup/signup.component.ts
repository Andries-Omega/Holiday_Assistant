import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { PasswordRequirements, Users } from 'src/app/models/Users';
import { AuthServiceService } from 'src/app/services/auth-service.service';

import { AppState } from 'src/app/store/global/global.reducer';
import { selectSignUpInfo } from 'src/app/store/global/global.selectors';
import { signIn } from '../Algorithms/Authentication/authetication';

import {
  validateEmail,
  validatePassword,
} from '../Algorithms/Authentication/signupvalidation';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  theSignUpState$ = this.globalStore.select(selectSignUpInfo);
  errorMessage: string = '';
  readyToSingUp: boolean = false;
  signingUp: boolean = false;
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

  signUpUser(userData: Users) {
    this.signingUp = true;
    this.authService
      .signUpUser(userData)
      .then((r: string | boolean) => {
        this.errorMessage = '';
        if (typeof r !== 'boolean') {
          signIn(r, this.globalStore, this.route);
        }
      })
      .catch((err: Error) => {
        this.signingUp = false;
        this.errorMessage =
          err.message ===
          'FirebaseError: Firebase: Error (auth/email-already-in-use).'
            ? 'The email you have provided already exists'
            : 'error occured while signing you, please try again';
      });
  }
}
