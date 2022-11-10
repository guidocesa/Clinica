import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoolToSinoPipe } from './Pipes/bool-to-sino.pipe';
import { TimestampToDatePipe } from './Pipes/timestamp-to-date.pipe';



@NgModule({
  declarations: [
    BoolToSinoPipe,
    TimestampToDatePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BoolToSinoPipe,
    TimestampToDatePipe
  ]
})
export class SharedModule { }
