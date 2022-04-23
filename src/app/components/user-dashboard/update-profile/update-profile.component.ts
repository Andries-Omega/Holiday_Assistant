import { Component, OnInit } from '@angular/core';
import { sizeAnime } from 'src/app/Animations/dashboard-animations';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.scss'],
  animations: [sizeAnime],
})
export class UpdateProfileComponent implements OnInit {
  isUpdatingLoginDetails: boolean = false;

  constructor() {}
  ngOnInit(): void {}
}
