import {Filter} from './filter';
import {FilterIn} from './filter-in';

export class Column {
  columnKey?: string;
  columnName: string;
  sortable?: boolean;
  filterable?: boolean;
  cellRender?: (row: any) => string;
  filterIn?: Array<FilterIn> = [];
}

export class ExtendedColumn {
  id: string;
  column: Column;
  filter?: Filter;
}
