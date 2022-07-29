import {AfterViewInit, Component, ElementRef, Inject, Input, OnInit, Pipe, PipeTransform, ViewChild} from '@angular/core';
import {ExtendedColumn} from '../../model/column';
import {FilterType} from '../../model/filter';
import {BehaviorSubject} from 'rxjs';
import {FilterIn} from '../../model/filter-in';
import {
  ANGULAR_DATATABLE_ADVANCED_CONFIGURATION,
  AngularDatatableAdvancedConfiguration
} from '../../angular-datatable-advanced-configuration';
import flatpickr from 'flatpickr';

@Component({
  selector: 'ada-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements AfterViewInit {

  @Input()
  column: ExtendedColumn;
  @Input()
  filterUpdateSubject: BehaviorSubject<ExtendedColumn>;
  @Input()
  enabledFilterTypes: Array<FilterType> = null;

  FILTER_TYPES = FilterType;
  filterIn: Array<FilterIn> = [];
  filterType: FilterType = FilterType.EQUALS;
  // default filter
  filter1: any;
  // additional filter for range select
  filter2: any;
  // filter of IN result
  filter3: Array<any> = [];

  filterOutSelect = null;

  @ViewChild('input')
  input: ElementRef;
  @ViewChild('tillInput')
  tillInput: ElementRef;

  flatPickrInput: flatpickr.Instance;
  flatPickrInputTill: flatpickr.Instance;

  constructor(
      @Inject(ANGULAR_DATATABLE_ADVANCED_CONFIGURATION) readonly configuration: AngularDatatableAdvancedConfiguration
  ) {}

  ngAfterViewInit(): void {
    if (this.column.column.filterIn) {
      this.filterIn = this.column.column.filterIn;
      this.filterType = FilterType.IN;
    } else if (this.column.column.filterInPromise) {
      this.column.column.filterInPromise
        .subscribe(result => {
          this.filterIn = result || [];
          this.filterType = FilterType.IN;
        });
    }

    if (this.enabledFilterTypes) {
      if (this.isSingleFilterEnabled() || this.enabledFilterTypes.indexOf(this.filterType) < 0) {
        this.filterType = this.enabledFilterTypes[0];
      }
    }

    if (this.hasDateTimeSelect()) {
      const options = this.column.column.filterDateOptions || {};
      options.mode = 'single';

      this.flatPickrInput = flatpickr(this.input.nativeElement, options);
      this.flatPickrInputTill = flatpickr(this.tillInput.nativeElement, options);
    }
  }

  applyFilter() {
    if (this.hasSetSelect()) {
      this.column.filter = {
        type: this.filterType,
        value1: this.filter3.length ? this.filter3 : null
      };
    } else {
      this.column.filter = {
        type: this.filterType,
        value1: this.filter1
      };

      if (this.flatPickrInput) {
        this.column.filter.value1 = this.flatPickrInput.parseDate(
          this.filter1,
          this.flatPickrInput.config.dateFormat,
          !this.flatPickrInput.config.enableTime
        );
      }

      if (this.filterType === FilterType.RANGE) {
        this.column.filter.value2 = this.filter2;

        if (this.flatPickrInputTill) {
          this.column.filter.value2 = this.flatPickrInputTill.parseDate(
            this.filter2,
            this.flatPickrInputTill.config.dateFormat,
            !this.flatPickrInputTill.config.enableTime
          );
        }
      }
    }

    if (!this.column.filter.value1 && !this.column.filter.value2) {
      this.column.filter = null;
    }

    this.filterUpdateSubject.next(this.column);
  }

  clearFilter() {
    this.column.filter = null;
    this.filter1 = null;
    this.filter2 = null;
    this.filter3 = [];
    if (this.hasDateTimeSelect()) {
      this.flatPickrInput.clear();
      this.flatPickrInputTill.clear();
    }
    this.filterUpdateSubject.next(this.column);
  }

  ignoreMenuClick($event){
    $event.stopPropagation();
  }

  hasSetSelect() {
    return this.filterIn && this.filterIn.length > 0;
  }

  hasDateTimeSelect(): boolean {
    return !!this.column.column.filterDateOptions;
  }

  checkboxChange(value: any, e){
    if (e.target.checked) {
      this.filter3.push(value);
    } else {
      this.filter3.splice(this.filter3.indexOf(value));
    }
  }

  isFilterEnabled(filterType: FilterType): boolean {
    return !this.enabledFilterTypes || this.enabledFilterTypes.indexOf(filterType) > -1;
  }

  isSingleFilterEnabled() {
    return this.enabledFilterTypes && this.enabledFilterTypes.length === 1;
  }
}

@Pipe({
  name: 'filter',
  pure: false
})
export class FilterSelectByKeyword implements PipeTransform {
  transform(items: Array<FilterIn>, arg: string): Array<FilterIn> {
    if (!items || !arg) {
      return items;
    }

    arg = arg.toLowerCase();
    return items.filter(item => toLowerString(item.label).indexOf(arg) !== -1 || toLowerString(item.value).indexOf(arg) !== -1);
  }
}

function toLowerString(o: any): string {
  return o.toString().toLowerCase();
}
