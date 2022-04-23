import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { validatePassword } from 'src/app/components/Algorithms/Authentication/signupvalidation';

@Component({
  selector: 'app-update-profile-password-popup',
  templateUrl: './update-profile-password-popup.component.html',
  styleUrls: ['./update-profile-password-popup.component.scss'],
})
export class UpdateProfilePasswordPopupComponent {
  @Input() enterPasswordVisible!: boolean;
  passwordVisible: boolean = false;
  passwordFocus: boolean = false;
  password: string = '';
  errorMessage: string = '';

  @Output() userPassword = new EventEmitter<string>();
  @Output() closePopup = new EventEmitter<void>();

  update() {
    if (this.validatePassword()) {
      this.errorMessage = '';
      this.userPassword.emit(this.password);
    } else {
      this.errorMessage = 'There is no way that is your password';
    }
  }

  closepop() {
    this.closePopup.emit();
  }

  /**
   * Reason i am doing this is because i already know the pattern accepted by signup inorder to register them,
   * so if what they entered is not my pattern, then it is also not their password.
   * i.e. no need to wait for firebase to us what's wrong if we know.
   */
  validatePassword(): boolean {
    const passwordReq = validatePassword(this.password);
    return Object.values(passwordReq).every((value) => value);
  }
}
