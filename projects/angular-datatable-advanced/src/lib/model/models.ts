import {Observable} from 'rxjs';
import {Filter} from './filter';
import {Column} from './column';

export interface RequestParams {
  page: number;
  size: number;
  filters: ColumnWithFilter[];
}

export interface ColumnWithFilter {
  filter: Filter;
  column: Column;
}

export interface LoadResult {
  rows: Array<any>;
  totalItems: number;
}

export type RowsLoader = (parameters: RequestParams) => Observable<LoadResult>;
