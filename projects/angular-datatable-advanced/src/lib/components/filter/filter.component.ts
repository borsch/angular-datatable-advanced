import {Component, Input} from '@angular/core';
import {ExtendedColumn} from '../../model/column';
import {FilterType} from '../../model/filter';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'ada-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent {

  @Input()
  column: ExtendedColumn;
  @Input()
  filterUpdateSubject: BehaviorSubject<ExtendedColumn>;

  filterType: FilterType = FilterType.EQUALS;
  filter1: any;
  filter2: any;

  applyFilter() {
    this.column.filter = {
      type: this.filterType,
      value1: this.filter1
    };

    if (this.filterType === FilterType.RANGE) {
      this.column.filter.value2 = this.filter2;
    }

    this.filterUpdateSubject.next(this.column);
  }

  clearFilter() {
    delete this.column.filter;
    this.filter1 = null;
    this.filter2 = null;
    this.filterUpdateSubject.next(this.column);
  }

  ignoreMenuClick($event){
    $event.stopPropagation();
  }

}
