import {Filter, FilterType} from './filter';
import {FilterIn} from './filter-in';
import {Observable} from 'rxjs';
import {FlatpickrDefaultsInterface} from 'angularx-flatpickr/flatpickr-defaults.service';

export class Column {
  columnKey: string;
  columnName: string;
  sortable?: boolean;
  filterable?: boolean;
  enabledFilters?: Array<FilterType> = null;
  cellRender?: (row: any) => string;
  filterIn?: Array<FilterIn> = [];
  filterInPromise?: Observable<Array<FilterIn>> = null;
  filterDateOptions?: FlatpickrDefaultsInterface;
  onClick?: (row: any) => void;
}

export class ExtendedColumn {
  id: string;
  column: Column;
  filter?: Filter;
}
