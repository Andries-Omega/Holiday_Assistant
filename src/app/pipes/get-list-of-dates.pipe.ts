import { Pipe, PipeTransform } from '@angular/core';
import { createListOfAvailableDates } from '../components/Algorithms/CommonFunctions';
import { Trip } from '../models/Itenaries';

@Pipe({
  name: 'getListOfDates',
})
export class GetListOfDatesPipe implements PipeTransform {
  transform(holiday: Trip): Date[] {
    return createListOfAvailableDates(
      new Date(holiday.tripStartDate),
      new Date(holiday.tripEndDate)
    );
  }
}
