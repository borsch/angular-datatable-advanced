import { Component } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {RowsLoader} from '../../../angular-datatable-advanced/src/lib/model/models';
import {Column} from '../../../angular-datatable-advanced/src/lib/model/column';

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
      columnName: 'Record class'
    }, {
      columnKey: 'geolocation.type',
      columnName: 'Geolocation type'
    }, {
      columnName: 'Coordinates',
      cellRender: (row) => row.geolocation && row.geolocation.coordinates
        ? `LNG: ${row.geolocation.coordinates[0]}, LAT: ${row.geolocation.coordinates[1]}`
        : '-',
      sortable: true,
      filterable: true
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
}
