import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-signup-desktop',
  templateUrl: './signup-desktop.component.html',
  styleUrls: ['./signup-desktop.component.scss'],
})
export class SignupDesktopComponent implements OnInit {
  //text fields validity
  nameValid: boolean = false;
  emailValid: boolean = false;
  passwordValid: boolean = false;

  // passwords visibility
  passwordVisible: boolean = false;
  confirmPasswordVisible: boolean = false;

  constructor() {}

  ngOnInit(): void {}

  verifyEmail() {}
}
