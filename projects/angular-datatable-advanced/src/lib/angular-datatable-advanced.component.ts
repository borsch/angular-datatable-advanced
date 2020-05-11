import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {catchError, finalize, mergeAll, tap} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
import {asapScheduler, BehaviorSubject, Observable, of, scheduled} from 'rxjs';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {RowsLoader} from './model/models';
import {Column} from './model/column';

@Component({
  selector: 'ada-table',
  templateUrl: './angular-datatable-advanced.component.html',
  styleUrls: ['./angular-datatable-advanced.component.scss']
})
export class AngularDatatableAdvancedComponent implements OnInit, AfterViewInit {

  private rowsSubject = new BehaviorSubject<Array<any>>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  dataSource: DataSource<any>;
  loading$ = this.loadingSubject.asObservable();
  totalItems = 0;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input()
  columns: Column[];
  @Input()
  displayedColumns;
  @Input()
  pageSize = 10;
  @Input()
  pageSizeOptions = [10, 20];
  @Input()
  rowsLoader: RowsLoader;

  ngOnInit(): void {
    const self = this;
    this.dataSource = new (class CustomDataSource implements DataSource<any> {
      connect(collectionViewer: CollectionViewer): Observable<any[] | ReadonlyArray<any>> {
        return self.rowsSubject.asObservable();
      }
      disconnect(collectionViewer: CollectionViewer): void {
        self.rowsSubject.complete();
        self.loadingSubject.complete();
      }
    })();
    this.loadPage(0, this.pageSize);
  }

  ngAfterViewInit() {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    scheduled([this.sort.sortChange, this.paginator.page], asapScheduler)
      .pipe(mergeAll())
      .pipe(tap(() => this.loadPage(this.paginator.pageIndex, this.paginator.pageSize)))
      .subscribe();
  }

  renderCell(row: any, column: Column) {
    return row[column.columnKey];
  }

  getColumns() {
    return this.columns.map(col => col.columnKey);
  }

  openColumnFilter(column: Column) {
    console.log(column);
  }

  private loadPage(page, size) {
    this.loadingSubject.next(true);
    this.rowsSubject.next([]);

    this.rowsLoader({page, size})
      .pipe(
        catchError(() => of({
          rows: [],
          totalItems: 0
        })),
        finalize(() => this.loadingSubject.next(false))
      )
      .subscribe(result => {
        this.rowsSubject.next(result.rows);
        this.totalItems = result.totalItems;
      });
  }
}
