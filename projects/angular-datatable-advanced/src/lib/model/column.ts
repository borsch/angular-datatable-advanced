export class Column {
  columnKey: string;
  columnName: string;
  sortable?: boolean;
  filterable?: boolean;
  cellRender?: (row: any) => string;
}
