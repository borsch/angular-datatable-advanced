import {Observable} from 'rxjs';
import {Filter} from './filter';
import {Column} from './column';

export interface RequestParams {
  page: number;
  size: number;
  filters: ColumnWithFilter[];
  sort?: Sort;
}

export interface ColumnWithFilter {
  filter: Filter;
  column: Column;
}

export interface LoadResult {
  rows: Array<any>;
  totalItems: number;
}

export interface Sort {
  direction: string;
  column: Column;
}

export type RowsLoader = (parameters: RequestParams) => Observable<LoadResult>;
