import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-spinner2',
  templateUrl: './spinner2.component.html',
  styleUrls: ['./spinner2.component.scss']
})
export class Spinner2Component implements OnInit {
  @Input() color: ThemePalette = 'primary';
  @Input() diameter: number = 20;
  
  constructor() { }

  ngOnInit(): void {
  }

  /*************************
   * 
   * USO:
   * <app-spinner [diameter]="50"></app-spinner>
   * 
   * diameter: en pixeles
   * 
   *************************/

}
