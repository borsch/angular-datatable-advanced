import {Observable} from 'rxjs';

export interface RequestParams {
  page: number;
  size: number;
}

export interface LoadResult {
  rows: Array<any>;
  totalItems: number;
}

export type RowsLoader = (parameters: RequestParams) => Observable<LoadResult>;
