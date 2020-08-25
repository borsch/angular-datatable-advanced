import { Component } from '@angular/core';
import {Column, RowsLoader, LoadResult, RequestParams} from 'angular-datatable-advanced';
import {Observable, of} from 'rxjs';
import {FilterIn} from 'angular-datatable-advanced/lib/model/filter-in';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styles: []
})
export class AppComponent {

  minExampleColumns: Column[] = [
    {
      columnKey: 'plainTextFilter',
      columnName: 'Plain Text filter',
      sortable: true,
      filterable: true
    },
    {
      columnKey: 'render.deep.field',
      columnName: 'Render deep field',
      sortable: true,
      filterable: true
    },
    {
      columnKey: 'cellRenderExample',
      columnName: 'Custom cellRender Example',
      sortable: true,
      filterable: true,
      cellRender: row => 'render full object in single column: ' + JSON.stringify(row)
    }
  ];

  columnSetSelect: Column[] = [
    {
      columnKey: 'setFilter',
      columnName: 'Set Filter',
      filterable: true,
      filterIn: [{
        value: 'value_1',
        label: 'Readable label: value 1'
      }, {
        value: 'value_2',
        label: 'Readable label: value 2'
      }]
    }, {
      columnKey: 'setFilterObservable',
      columnName: 'Set filter with options from observable',
      filterable: true,
      filterInPromise: this.setFilterObservable()
    }
  ];

  dateTimeColumns: Column[] = [
    {
      columnKey: 'dateTimeFilter',
      columnName: 'Date time filter',
      filterable: true,
      sortable: true,
      filterDateOptions: {
        enableTime: true,
        time24hr: true,
        altFormat: 'd/m/Y H:i',
        dateFormat: 'Z',
        altInput: true
      }
    }, {
      columnKey: 'dateFilter',
      columnName: 'Date filter',
      filterable: true,
      sortable: true,
      filterDateOptions: {
        altFormat: 'd/m/Y',
        dateFormat: 'd/m/Y',
        altInput: true
      }
    }
  ];

  rowsLoader: RowsLoader = (filters: RequestParams): Observable<LoadResult> => {
    console.log('Filters: ', JSON.stringify(filters, null, 4));

    return of({
      totalItems: 3,
      rows: [
        {
          plainTextFilter: 'Plain text filter: row1',
          render: {
            deep: {
              field: 'deep field: row1'
            }
          },
          setFilter: 'Set filter: row1',
          setFilterObservable: 'Set filter observable: row1',
          dateTimeFilter: '2020/02/03 04:05:06',
          dateFilter: '2020/02/03'
        },
        {
          plainTextFilter: 'Plain text filter: row2',
          render: {

          },
          setFilter: 'Set filter: row2',
          setFilterObservable: 'Set filter observable: row2',
          dateTimeFilter: '2020/10/11 12:13:14',
          dateFilter: '2020/10/11'
        },
        {
          plainTextFilter: 'Plain text filter: row3',
          setFilter: 'Set filter: row3',
          setFilterObservable: 'Set filter observable: row3',
          dateTimeFilter: '2020/10/11 12:13:44',
          dateFilter: '2020/12/11'
        }
      ]
    });
  }

  private setFilterObservable(): Observable<Array<FilterIn>> {
    // can be replaced with any http request
    return of([
      {
        value: 'observable_value_1',
        label: 'Observable value 1 label'
      }, {
        value: 'observable_value_2',
        label: 'Observable value 2 label'
      }
    ]);
  }
}
