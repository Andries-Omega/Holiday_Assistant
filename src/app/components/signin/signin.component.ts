import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent implements OnInit {
  signInForm!: FormGroup;
  passwordVisible: boolean = false;

  constructor(private formBuilder: FormBuilder) {}

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
  signInUser() {
    console.log(this.signInForm.value);
  }
}
