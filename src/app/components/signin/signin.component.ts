import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserCredential } from '@firebase/auth';
import { Store } from '@ngrx/store';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import { AppState } from 'src/app/store/global/global.reducer';
import { signIn } from '../Algorithms/Authentication/authetication';

enum FirebaseResponses {
  InvalidPassword = 'Firebase: Error (auth/wrong-password).',
  UserNotFound = 'Firebase: Error (auth/user-not-found).',
}

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signInForm!: FormGroup;
  passwordVisible: boolean = false;
  errorMessage!: string;
  signingIn: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private globalState: Store<AppState>,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.signInForm = this.formBuilder.group({
      email: [
        '',
        [Validators.email, Validators.required, Validators.minLength(1)],
      ],
      password: ['', [Validators.required, Validators.minLength(1)]],
    });
  }
  submitSignInReady(): boolean {
    return (
      this.signInForm.value.email &&
      this.signInForm.value.password &&
      !this.signingIn
    );
  }
  signInUser() {
    this.signingIn = true;
    this.authService
      .signInUser(this.signInForm.value.email, this.signInForm.value.password)
      .then((result: UserCredential) => {
        signIn(result.user.uid, this.globalState, this.route);
      })
      .catch((err: Error) => {
        /**
         * reason i am checking both is because if a hacker guessed the email right,
         * it's not smart to let them know that they did. So it's better to let them stay
         * confused trying to figure out if it's the email, password or both that is wrong
         */
        this.signingIn = false;
        this.errorMessage =
          err.message === FirebaseResponses.InvalidPassword ||
          FirebaseResponses.UserNotFound
            ? 'Invalid email or (and) password'
            : 'Unable to sign in';
      });
    console.log(this.signInForm.value);
  }
}
