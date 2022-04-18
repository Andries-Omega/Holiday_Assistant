import { Pipe, PipeTransform } from '@angular/core';
import { ListOfCurrencies } from '../models/Currencies';

@Pipe({
  name: 'convertConvertedCurrency',
})
export class ConvertConvertedCurrencyPipe implements PipeTransform {
  transform(recievedData: ListOfCurrencies, toCurrency: string): number {
    return recievedData?.data[toCurrency].value;
  }
}
