import { Component, Input, OnInit } from '@angular/core';
import { Trip } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-trip-view',
  templateUrl: './trip-view.component.html',
  styleUrls: ['./trip-view.component.scss'],
})
export class TripViewComponent {
  @Input() trip!: Trip;
}
