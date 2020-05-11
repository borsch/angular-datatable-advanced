import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'ada-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  ngOnInit(): void {
  }

  ignoreMenuClick($event){
    $event.stopPropagation();
  }

}
