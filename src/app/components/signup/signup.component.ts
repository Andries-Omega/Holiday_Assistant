import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { setDoc } from '@firebase/firestore';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { PasswordRequirements, Users } from 'src/app/models/Users';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AppState } from 'src/app/store/global/global.reducer';
import { selectSignUpInfo } from 'src/app/store/global/global.selectors';
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
    private fireStore: Firestore,
    private auth: Auth,
    private authService: AuthServiceService
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
      .then(() => {
        this.errorMessage = '';
        console.log('signed in');
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
