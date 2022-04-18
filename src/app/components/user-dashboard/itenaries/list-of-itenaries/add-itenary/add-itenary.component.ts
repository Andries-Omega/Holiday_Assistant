import { Component, Input, Output } from '@angular/core';
import { Holiday, Itenaries } from 'src/app/models/Itenaries';

@Component({
  selector: 'app-add-itenary',
  templateUrl: './add-itenary.component.html',
  styleUrls: ['./add-itenary.component.scss'],
})
export class AddItenaryComponent {
  @Input() isAddingItenary!: boolean | null;
  @Input() selectedDate!: Date;
  @Input() listOfAvailableDates!: Date[];
  @Input() holiday!: Holiday;
  currentPhase: number = 0;

  itenaryDetails: Itenaries = {
    itenaryName: '',
    itenaryTag: '',
    itenaryStartTime: '',
    itenaryEndTime: '',
    costEstimate: 0,
    costEstimateCurrency: '',
  };
  next() {}

  previous() {}
}
