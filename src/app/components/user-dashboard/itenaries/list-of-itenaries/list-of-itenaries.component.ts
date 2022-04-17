import { Component, Input, OnInit } from '@angular/core';
import { Holiday } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-list-of-itenaries',
  templateUrl: './list-of-itenaries.component.html',
  styleUrls: ['./list-of-itenaries.component.scss'],
})
export class ListOfItenariesComponent implements OnInit {
  @Input() holidays!: Holiday[] | null;
  showCalendarLarge: boolean = true;

  constructor() {}
  ngOnInit(): void {}
}
