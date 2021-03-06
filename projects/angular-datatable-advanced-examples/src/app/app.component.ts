import { Component } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {CogMenu, RowsLoader} from '../../../angular-datatable-advanced/src/lib/model/models';
import {Column} from '../../../angular-datatable-advanced/src/lib/model/column';
import {FilterIn} from '../../../angular-datatable-advanced/src/lib/model/filter-in';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  columns: Column[] = [
    {
      columnKey: 'id',
      columnName: '#',
      sortable: true,
      filterable: true
    }, {
      columnKey: 'name',
      columnName: 'Name',
      sortable: true,
      filterable: true
    }, {
      columnKey: 'nametype',
      columnName: 'Name type',
      filterable: true,
      filterIn: [
        { value: 'valid', label: 'Valid' },
        { value: 'invalid', label: 'Invalid' }
      ]
    }, {
      columnKey: 'recclass',
      columnName: 'Record class',
      filterable: true,
      filterInPromise: this.loadRecordClass()
    }, {
      columnKey: 'geolocation.type',
      columnName: 'Geolocation type',
      onClick: row => {
        console.log('Geolocation', row);
      }
    }, {
      columnKey: 'coords',
      columnName: 'Coordinates',
      cellRender: (row) => row.geolocation && row.geolocation.coordinates
        ? `LNG: ${row.geolocation.coordinates[0]}, LAT: ${row.geolocation.coordinates[1]}`
        : '-',
      sortable: true,
      filterable: true,
      onClick: row => {
        console.log('coords', row);
      }
    }, {
      columnKey: 'test',
      columnName: 'Test date time picker',
      filterable: true,
      filterDateOptions: {
        enableTime: true,
        time24hr: true,
        altFormat: 'd/m/Y H:i',
        dateFormat: 'Z',
        altInput: true
      }
    }, {
      columnKey: 'test',
      columnName: 'Test date picker',
      filterable: true,
      filterDateOptions: {
        altFormat: 'd/m/Y',
        dateFormat: 'd/m/Y',
        altInput: true
      }
    }
  ];

  cogMenu: CogMenu[] = [
    {
      name: 'Button 1',
      onClick: item => alert('Click on Button 1')
    },
    {
      name: 'Invalidate',
      renderCheck: item => item.nametype === 'Valid',
      onClick: item => item.nametype = 'Invalid'
    },
    {
      name: 'Validate',
      renderCheck: item => item.nametype === 'Invalid',
      onClick: item => item.nametype = 'Valid'
    }
  ];

  constructor(private http: HttpClient) {}

  public booksLoader(): RowsLoader {
    return (requestParams) => {
      console.log('Run search with params: ', requestParams);

      let httpParams = new HttpParams()
        .set('_start', (requestParams.page * requestParams.size).toString())
        .set('_end', (requestParams.page * requestParams.size + requestParams.size).toString());
      if (requestParams.sort) {
        httpParams = httpParams
          .set('_sort', requestParams.sort.column.columnKey)
          .set('_order', requestParams.sort.direction);
      }

      return this.http.get('http://localhost:3000/data', {
        params: httpParams
      })
        .pipe(map(result => {
          const array = result as Array<any>;
          return {
            rows: array,
            totalItems: 1000
          };
        }));
    };
  }

  private loadRecordClass(): Observable<Array<FilterIn>> {
    return of([
      {
        value: 'L5',
        label: 'L5 label'
      }, {
        value: 'H6',
        label: 'H6 label'
      }, {
        value: 'Other',
        label: 'Other label'
      }
    ]);
  }
}
