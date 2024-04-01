import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true,
})
export class CustomDatePipe implements PipeTransform {
  //* I am fully aware that there is builtin pipe for handling dates
  //* but i wanted to create my own so i can learn how to create pipes
  transform(date: ReservationDate | null): unknown {
    if (date === null) return '';
    return `${date.day}.${date.month}.${date.year} - ${date.hour}`;
  }
}
