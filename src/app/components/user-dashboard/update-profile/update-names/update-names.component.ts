import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-update-names',
  templateUrl: './update-names.component.html',
  styleUrls: ['./update-names.component.scss'],
})
export class UpdateNamesComponent {
  @Input() name!: string;
  @Input() preferredName!: string;
}
