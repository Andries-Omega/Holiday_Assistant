import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { fade } from 'src/app/Animations/dashboard-animations';

@Component({
  selector: 'app-holidays',
  templateUrl: './holidays.component.html',
  styleUrls: ['./holidays.component.scss'],
  animations: [fade],
})
export class HolidaysComponent implements OnInit {
  fadeList: string = 'In';
  fadeAdd: string = 'Out';

  isAddingHoliday: boolean = false;
  addingHoliday: boolean = false;

  constructor(private router: Router) {}

  ngOnInit(): void {}

  /**
   * Doing this so i can have smooth transition between showing list of holidays and adding new holiday
   */
  handleSwitchComponents() {
    if (this.isAddingHoliday) {
      // then we entering lists
      this.addToList();
    } else {
      // then we entering add
      this.listToAdd();
    }
  }

  addToList() {
    this.fadeAdd = 'Out'; // Initiate fade out animation
    setTimeout(() => {
      // waiting for the fade animation
      this.isAddingHoliday = false;
      this.fadeList = 'In'; // Initiate fade in animation
    }, 1000);
  }

  listToAdd() {
    this.fadeList = 'Out';
    setTimeout(() => {
      this.isAddingHoliday = true;
      this.fadeAdd = 'In';
    }, 1000);
  }
}
