import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appAgrandar]'
})
export class AgrandarDirective {

  constructor( private el: ElementRef)  { }

  @HostListener('mouseenter')
  onMouseEnter(){
    this.el.nativeElement.style.scale = "1.2";
  }

  @HostListener('mouseleave')
  onMouseLeave(){
    this.el.nativeElement.style.scale = "1";
  }
}
