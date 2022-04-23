import { Component, Input, OnInit } from '@angular/core';
import { sizeAnime } from 'src/app/Animations/dashboard-animations';

@Component({
  selector: 'app-update-login-details',
  templateUrl: './update-login-details.component.html',
  styleUrls: ['./update-login-details.component.scss'],
  animations: [sizeAnime],
})
export class UpdateLoginDetailsComponent implements OnInit {
  @Input() isUpdatingLoginDetails!: boolean;
  @Input() isMobile!: boolean;
  passwordVisible: boolean = false;
  passwordFocus: boolean = false;
  constructor() {}

  ngOnInit(): void {}
}
