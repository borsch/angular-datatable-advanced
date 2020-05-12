import {Filter} from './filter';

export class Column {
  columnKey?: string;
  columnName: string;
  sortable?: boolean;
  filterable?: boolean;
  cellRender?: (row: any) => string;
}

export class ExtendedColumn {
  id: string;
  column: Column;
  filter?: Filter;
}
