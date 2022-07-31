import {Component, Input } from '@angular/core';
import {CogMenu} from '../../model/models';

@Component({
  selector: 'ada-cog-menu',
  templateUrl: './cog-menu.component.html',
  styleUrls: ['./cog-menu.component.scss']
})
export class CogMenuComponent {

  @Input()
  cogMenu: CogMenu[];
  @Input()
  row: any;

  constructor() { }

  handleClick(menu: CogMenu) {
    if (menu.onClick) {
      menu.onClick(this.row);
    }
  }

}
