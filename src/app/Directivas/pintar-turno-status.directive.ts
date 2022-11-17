import { Directive, ElementRef, Input } from '@angular/core';
import { TurnoStatus } from '../servicios/turno-status';

@Directive({
  selector: '[appPintarTurnoStatus]'
})
export class PintarTurnoStatusDirective {
  @Input() appPintarTurnoStatus = '';

  constructor(private el: ElementRef) { }

  ngOnChanges()
  {
    switch (this.appPintarTurnoStatus) {
      case TurnoStatus.cancelado:
        this.el.nativeElement.style.color = 'red';
        break;
      case TurnoStatus.aceptado:
        this.el.nativeElement.style.color = 'green';
        break;
      case TurnoStatus.finalizado:
        this.el.nativeElement.style.color = 'blue';
        break;
      case TurnoStatus.rechazado:
        this.el.nativeElement.style.color = 'brown';
        break;
      default:
        this.el.nativeElement.style.color = 'black';
        break;
    }
  }

}
