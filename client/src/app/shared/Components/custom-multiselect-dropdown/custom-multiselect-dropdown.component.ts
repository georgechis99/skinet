import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IMultiselectDropdownItem, MultiselectDropdownItem } from '../../models/multiselectDropdownItem';

@Component({
  selector: 'app-custom-multiselect-dropdown',
  templateUrl: './custom-multiselect-dropdown.component.html',
  styleUrls: ['./custom-multiselect-dropdown.component.scss']
})
export class CustomMultiselectDropdownComponent implements OnInit {

  isCollapsed = false;
  filterItems: IMultiselectDropdownItem[] = [];
  originalFilterItems: IMultiselectDropdownItem[] = [];

  enteredSearchValue = '';


  @Input() title: string;
  @Input() values: string[];


  constructor() { console.log(this.values)}

  ngOnInit(): void {
    this.values.forEach(value => {
      this.filterItems.push(new MultiselectDropdownItem(value));
    });
    this.originalFilterItems = this.filterItems;
    console.log(this.filterItems);

  }

  getCheckedItems() {
    console.log(this.filterItems.filter(x => x.checked === true).map(x => x.name));
  }

  onSearchTermChanged() {
    this.filterItems = this.originalFilterItems.filter(x => x.name.toLowerCase().includes(this.enteredSearchValue.toLowerCase()));
  }

}
