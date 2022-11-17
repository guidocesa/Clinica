import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caps'
})
export class CapsPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    try{
      return (value.charAt(0).toUpperCase() + value.slice(1));
    }catch(error){
      return null;
    }
  }

}
