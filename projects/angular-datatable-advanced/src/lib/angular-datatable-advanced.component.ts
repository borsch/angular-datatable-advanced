import {AfterViewInit, Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {catchError, finalize, mergeAll, tap} from 'rxjs/operators';
import {MatSort} from '@angular/material/sort';
import {asapScheduler, BehaviorSubject, Observable, of, scheduled} from 'rxjs';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {CogMenu, ColumnWithFilter, RowsLoader, Sort} from './model/models';
import {Column, ExtendedColumn} from './model/column';
import {DomSanitizer} from '@angular/platform-browser';

const COG_MENU_COLUMN = 'cogMenuColumn';

@Component({
  selector: 'ada-table',
  templateUrl: './angular-datatable-advanced.component.html',
  styleUrls: ['./angular-datatable-advanced.component.scss']
})
export class AngularDatatableAdvancedComponent implements OnInit, AfterViewInit, OnDestroy {

  private rowsSubject = new BehaviorSubject<Array<any>>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);

  filterUpdateSubject = new BehaviorSubject<ExtendedColumn>(null);
  extendedColumns: ExtendedColumn[];
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
  @Input()
  cogMenu: Array<CogMenu>;

  constructor(private sanitizer: DomSanitizer) {
  }

  ngOnInit(): void {
    this.validateColumns();
    this.buildColumns();

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

    this.filterUpdateSubject.subscribe(updatedColumn => {
      if (updatedColumn) {
        this.paginator.pageIndex = 0;
        this.loadPage(0, this.paginator.pageSize);
      }
    });
  }

  ngOnDestroy(): void {
    this.filterUpdateSubject.complete();
  }

  renderCell(row: any, column: Column) {
    if (column.cellRender) {
      return this.sanitizer.bypassSecurityTrustHtml(column.cellRender(row));
    }
    return this.getValueRecursively(row, column.columnKey.split('.'));
  }

  private getValueRecursively(object: any, propsPath: Array<string>) {
    const nextKey = propsPath[0];

    if (propsPath.length > 1) {
      return object ? this.getValueRecursively(object[nextKey], propsPath.slice(1, propsPath.length)) : null;
    } else {
      return object ? object[nextKey] : null;
    }
  }

  getColumns() {
    const columnIds = this.extendedColumns.map(col => col.id);
    if (this.hasCogMenu()) {
      columnIds.unshift(COG_MENU_COLUMN);
    }
    return columnIds;
  }

  hasCogMenu() {
    return this.cogMenu && this.cogMenu.length > 0;
  }

  /**
   * Method that can be called outside to trigger content loading
   */
  reloadToFirstPage() {
    this.paginator.pageIndex = 0;
    this.loadPage(0, this.paginator.pageSize);
  }

  private loadPage(page, size) {
    this.loadingSubject.next(true);
    this.rowsSubject.next([]);

    this.rowsLoader({page, size, filters: this.buildFilters(), sort: this.getSortField()})
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

  private getSortField(): Sort | null {
    let activeSortField: Sort = null;

    if (this.sort) {
      const sortDirection = this.sort['_direction'];
      if (sortDirection) {
        const columnId = this.sort.active;

        this.extendedColumns
          .filter(column => column.id === columnId)
          .map(column => column.column)
          .forEach(column => activeSortField = {
            column,
            direction: sortDirection
          });
      }
    }

    return activeSortField;
  }

  private validateColumns() {
    if (!this.columns || this.columns.length < 1) {
      throw new Error('[column] attribute is required');
    }
  }

  private buildColumns() {
    this.extendedColumns = this.columns.map(col => {
      return {
        column: col,
        id: `${(col.columnKey || 'none')}-${Math.random()}`
      };
    });
  }

  private buildFilters(): ColumnWithFilter[] {
    return this.extendedColumns
      .filter(column => !!column.filter)
      .map(column => {
        return {
          column: column.column,
          filter: column.filter
        } as ColumnWithFilter;
      });
  }
}
