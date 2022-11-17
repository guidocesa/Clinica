import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appResaltar]'
})
export class ResaltarDirective {

  constructor( private el: ElementRef)  { }

  @HostListener('mouseenter')
  onMouseEnter(){
    this.el.nativeElement.style.backgroundColor = 'orange';
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.el.nativeElement.style.backgroundColor = '';
  }

}
