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

  applyFilter() {
    this.column.filter = {
      type: this.filterType,
      value1: this.filter1
    };

    this.filterUpdateSubject.next(this.column);
  }

  clearFilter() {
    delete this.column.filter;
    this.filter1 = '';
    this.filterUpdateSubject.next(this.column);
  }

  ignoreMenuClick($event){
    $event.stopPropagation();
  }

}
