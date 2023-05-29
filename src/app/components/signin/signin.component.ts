import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { signIn } from 'src/app/store/global/global.actions';
import { AppState } from 'src/app/store/global/global.reducer';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signInForm!: FormGroup;
  passwordVisible = false;
  closedEye = 'fa-solid fa-eye-slash';
  openedEye = 'fa-solid fa-eye';

  constructor(
    private formBuilder: FormBuilder,
    private globalStore: Store<AppState>
  ) {}

  get email() {
    return this.signInForm.get('email');
  }

  get password() {
    return this.signInForm.get('password');
  }

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
    return this.signInForm.value.email && this.signInForm.value.password;
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  signInUser() {
    this.globalStore.dispatch(
      signIn({
        email: this.signInForm.value.email,
        password: this.signInForm.value.password,
      })
    );
  }
}
