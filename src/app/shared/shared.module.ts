import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BoolToSinoPipe } from './Pipes/bool-to-sino.pipe';
import { TimestampToDatePipe } from './Pipes/timestamp-to-date.pipe';
import { CapsPipe } from './Pipes/caps.pipe';



@NgModule({
  declarations: [
    BoolToSinoPipe,
    TimestampToDatePipe,
    CapsPipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    BoolToSinoPipe,
    TimestampToDatePipe,
    CapsPipe
  ]
})
export class SharedModule { }
