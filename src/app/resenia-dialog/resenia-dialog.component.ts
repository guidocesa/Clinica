import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-resenia-dialog',
  templateUrl: './resenia-dialog.component.html',
  styleUrls: ['./resenia-dialog.component.scss']
})
export class ReseniaDialogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
  }

}
