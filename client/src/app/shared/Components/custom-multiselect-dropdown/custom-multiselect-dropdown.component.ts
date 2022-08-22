import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-custom-multiselect-dropdown',
  templateUrl: './custom-multiselect-dropdown.component.html',
  styleUrls: ['./custom-multiselect-dropdown.component.scss']
})
export class CustomMultiselectDropdownComponent implements OnInit {

  isCollapsed = false;

  @Input() title: string;
  @Input() values: string[];

  constructor() { console.log(this.values)}

  ngOnInit(): void {
  }

  checkCheckBoxvalue(event){
    console.log(event.value)
 }

}
