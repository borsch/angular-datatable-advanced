import {Filter} from './filter';
import {FilterIn} from './filter-in';
import {Observable} from 'rxjs';
import {FlatpickrDefaultsInterface} from 'angularx-flatpickr/flatpickr-defaults.service';

export class Column {
  columnKey: string;
  columnName: string;
  sortable?: boolean;
  filterable?: boolean;
  cellRender?: (row: any) => string;
  filterIn?: Array<FilterIn> = [];
  filterInPromise?: Observable<Array<FilterIn>> = null;
  filterDateOptions?: FlatpickrDefaultsInterface;
}

export class ExtendedColumn {
  id: string;
  column: Column;
  filter?: Filter;
}
