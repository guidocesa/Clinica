import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
  name: 'timestampToDate'
})
export class TimestampToDatePipe implements PipeTransform {

  constructor(private datePipe: DatePipe) {}

  transform(value: any, ...args: any[]): string | null {
    try {
      return this.datePipe.transform(value.seconds*1000, 'dd-MM-yyyy HH:ss');
    } catch (error) {
      return null;
    }
  }

}
