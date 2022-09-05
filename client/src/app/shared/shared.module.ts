import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { PagingHeaderComponent } from './Components/paging-header/paging-header.component';
import { CustomMultiselectDropdownComponent } from './Components/custom-multiselect-dropdown/custom-multiselect-dropdown.component'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CollapseModule } from 'ngx-bootstrap/collapse';
import { PagerComponent } from './Components/pager/pager.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { OrderTotalsComponent } from './Components/order-totals/order-totals.component'
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TextInputComponent } from './Components/text-input/text-input.component'


@NgModule({
  declarations: [
    PagingHeaderComponent,
    CustomMultiselectDropdownComponent,
    PagerComponent,
    OrderTotalsComponent,
    TextInputComponent,


  ],
  imports: [
    FormsModule,
    CommonModule,
    PaginationModule.forRoot(),
    MatCheckboxModule,
    CollapseModule.forRoot(),
    CarouselModule.forRoot(),
    BsDropdownModule.forRoot(),
    ReactiveFormsModule
  ],
  exports: [
    PaginationModule,
    PagingHeaderComponent,
    CustomMultiselectDropdownComponent,
    PagerComponent,
    CarouselModule,
    OrderTotalsComponent,
    ReactiveFormsModule,
    BsDropdownModule,
    TextInputComponent
  ]
})
export class SharedModule { }
