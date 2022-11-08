import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'boolToSino'
})
export class BoolToSinoPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    let retorno = '';
    if(typeof value == 'boolean'){
      if(value){
        retorno = 'Si';
      }else{
        retorno = 'No';
      }
      return retorno;
    }
    return value;
  }

}
