import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {AngularDatatableAdvancedModule} from 'angular-datatable-advanced';
import {MatMenuModule} from '@angular/material/menu';
import {FormsModule} from '@angular/forms';
import {FlatpickrModule} from 'angularx-flatpickr';
import {MatIconModule} from '@angular/material/icon';
import {MatTableModule} from '@angular/material/table';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSortModule} from '@angular/material/sort';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlatpickrModule.forRoot(),
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatMenuModule,
    MatProgressSpinnerModule,
    AngularDatatableAdvancedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
