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
      columnKey: 'Title',
      columnName: 'Title header',
      sortable: true,
      filterable: true
    }, {
      columnKey: 'Year',
      columnName: 'Year header',
      sortable: true,
      filterable: true
    }
    , {
      columnKey: 'Released',
      columnName: 'Released header',
      sortable: false,
      filterable: false
    }
  ];

  constructor(private http: HttpClient) {
  }

  public booksLoader(): RowsLoader {
    return (requestParams) => {
      return this.http.get('http://localhost:3000/films', {
        params: new HttpParams()
          .set('_start', (requestParams.page * requestParams.size).toString())
          .set('_end', (requestParams.page * requestParams.size + requestParams.size).toString())
      })
        .pipe(map(result => {
          const array = result as Array<any>;
          return {
            rows: array,
            totalItems: 16
          };
        }));
    };
  }
}
