import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMomentDateModule } from '@angular/material-moment-adapter/';
import { MultiDatepickerComponent } from './multidatepicker.component';
import { YearPickerComponent } from './year-picker/year-picker.component';
import { MonthPickerComponent } from './month-picker/month-picker.component';
import { RegularDatepickerComponent } from './regular-picker/regular-datepicker.component';
import { InfoDialogComponent } from './month-picker/dialog/info-dialog/info-dialog.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatMomentDateModule,
  ],
  declarations: [
    InfoDialogComponent,
    MultiDatepickerComponent,
    MonthPickerComponent,
    YearPickerComponent,
    RegularDatepickerComponent,
  ],
  entryComponents: [InfoDialogComponent],
  exports: [
    MultiDatepickerComponent,
  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class MultiDatepickerModule { }