import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-update-names',
  templateUrl: './update-names.component.html',
  styleUrls: ['./update-names.component.scss'],
})
export class UpdateNamesComponent {
  @Input() name!: string;
  @Input() preferredName!: string;

  errorMessage: string = '';

  @Output() saveName = new EventEmitter<string>();
  @Output() savePreferredName = new EventEmitter<string>();

  handleChange(type: string) {
    if (type === 'Name') {
      if (this.name) {
        this.errorMessage = '';
        this.saveName.emit(this.name);
      } else {
        this.errorMessage = 'Name is requred';
      }
    } else {
      //it is preffered name we saving
      this.savePreferredName.emit(this.preferredName);
    }
  }
}
