import { Component, Input, OnInit } from '@angular/core';
import { ThemePalette } from '@angular/material/core';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
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
