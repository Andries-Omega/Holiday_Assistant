import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { sizeAnime } from 'src/app/Animations/dashboard-animations';
import {
  validateEmail,
  validatePassword,
} from 'src/app/components/Algorithms/Authentication/signupvalidation';

@Component({
  selector: 'app-update-login-details',
  templateUrl: './update-login-details.component.html',
  styleUrls: ['./update-login-details.component.scss'],
  animations: [sizeAnime],
})
export class UpdateLoginDetailsComponent {
  @Input() isUpdatingLoginDetails!: boolean;
  @Input() isMobile!: boolean;
  @Input() email!: string;

  password: string = '';
  passwordVisible: boolean = false;
  passwordFocus: boolean = false;
  errorEmailMessage: string = '';
  errorPassworMessage: String = '';

  @Output() saveEmail = new EventEmitter<string>();
  @Output() savePassword = new EventEmitter<string>();

  handleChange(type: string) {
    //don't even bother saving what is not valid
    if (type === 'Email') {
      if (this.validEmail()) {
        this.errorEmailMessage = '';
        this.saveEmail.emit(this.email);
      } else {
        this.errorEmailMessage = 'Invalid Email';
      }
    } else {
      if (this.validPassword()) {
        this.errorPassworMessage = '';
        this.savePassword.emit(this.password);
      } else {
        this.errorPassworMessage = 'Invalid Password';
      }
    }
  }

  validEmail(): boolean {
    return validateEmail(this.email);
  }

  validPassword(): boolean {
    const passwordReq = validatePassword(this.password);
    return Object.values(passwordReq).every((value) => value);
  }
}
