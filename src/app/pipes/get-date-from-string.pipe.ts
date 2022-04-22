import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'getDateFromString',
})
export class GetDateFromStringPipe implements PipeTransform {
  transform(value: string | undefined): Date | null {
    if (value) {
      return new Date(value);
    } else {
      return null;
    }
  }
}
