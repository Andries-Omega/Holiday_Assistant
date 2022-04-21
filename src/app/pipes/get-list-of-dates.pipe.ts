import { Pipe, PipeTransform } from '@angular/core';
import { createListOfAvailableDates } from '../components/Algorithms/CommonFunctions';
import { Holiday } from '../models/Itenaries';

@Pipe({
  name: 'getListOfDates',
})
export class GetListOfDatesPipe implements PipeTransform {
  transform(holiday: Holiday): Date[] {
    return createListOfAvailableDates(
      new Date(holiday.holidayStartDate),
      new Date(holiday.holidayEndDate)
    );
  }
}
