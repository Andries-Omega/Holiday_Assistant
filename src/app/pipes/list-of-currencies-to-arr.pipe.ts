import { Pipe, PipeTransform } from '@angular/core';
import { Currency, ListOfCurrencies } from '../models/Currencies';

@Pipe({
  name: 'listOfCurrenciesToArr',
})
export class ListOfCurrenciesToArrPipe implements PipeTransform {
  transform(lOfCurrencies: ListOfCurrencies | null): Currency[] {
    return lOfCurrencies?.data ? Object?.values(lOfCurrencies?.data) : [];
  }
}
