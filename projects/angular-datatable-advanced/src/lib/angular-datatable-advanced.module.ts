import { NgModule } from '@angular/core';
import { AngularDatatableAdvancedComponent } from './angular-datatable-advanced.component';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {FilterComponent} from './components/filter/filter.component';

@NgModule({
  declarations: [AngularDatatableAdvancedComponent, FilterComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ],
  exports: [AngularDatatableAdvancedComponent]
})
export class AngularDatatableAdvancedModule { }
