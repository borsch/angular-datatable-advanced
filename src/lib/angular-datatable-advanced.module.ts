import {ModuleWithProviders, NgModule} from '@angular/core';
import { AngularDatatableAdvancedComponent } from './angular-datatable-advanced.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {FilterComponent, FilterSelectByKeyword} from './components/filter/filter.component';
import {FormsModule} from '@angular/forms';
import { CogMenuComponent } from './components/cog-menu/cog-menu.component';
import {
  ANGULAR_DATATABLE_ADVANCED_CONFIGURATION,
  AngularDatatableAdvancedConfiguration,
  DEFAULT_CONFIG
} from './angular-datatable-advanced-configuration';

@NgModule({
  declarations: [AngularDatatableAdvancedComponent, FilterComponent, FilterSelectByKeyword, CogMenuComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatCardModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ],
  exports: [AngularDatatableAdvancedComponent]
})
export class AngularDatatableAdvancedModule {
  static forRoot(configuration?: AngularDatatableAdvancedConfiguration): ModuleWithProviders<AngularDatatableAdvancedModule> {
    return {
      ngModule: AngularDatatableAdvancedModule,
      providers: [{
        provide: ANGULAR_DATATABLE_ADVANCED_CONFIGURATION,
        useValue: configuration || DEFAULT_CONFIG
      }]
    };
  }
}
