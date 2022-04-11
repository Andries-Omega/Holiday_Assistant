import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { doc, Firestore } from '@angular/fire/firestore';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { createUserWithEmailAndPassword, updateProfile } from '@firebase/auth';
import { setDoc } from '@firebase/firestore';
import { Store } from '@ngrx/store';
import { Subject } from 'rxjs';
import { PasswordRequirements, Users } from 'src/app/models/Users';
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
  errorMessage!: string;
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
    private auth: Auth
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
    return (
      this.signUpUserForm.get('confirmPassword')?.enabled &&
      this.signUpUserForm.value.confirmPassword &&
      this.passwordsConfirmed
    );
  }
  signUpUser(userData: Users) {
    createUserWithEmailAndPassword(this.auth, userData.email, userData.password)
      .then((cred) => {
        return updateProfile(cred.user, {
          displayName: userData.preferredName
            ? userData.preferredName
            : userData.name,
        })
          .then(() => {
            setDoc(doc(this.fireStore, 'Users', cred.user.uid), {
              name: userData.name,
              email: userData.email,
              preferred_name: userData.preferredName,
            });
          })
          .catch((error) => {
            this.errorMessage = error;
            console.error('The Errorrr', error);
          });
      })
      .catch((err) => {
        this.errorMessage = err;
        console.error('The Error', err);
      });
    console.log(userData);
  }
}
