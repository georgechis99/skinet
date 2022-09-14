import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../shared/models/order';
import { OrdersService } from './orders.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {

  orders$: Observable<IOrder[]>;

  constructor(private ordersService: OrdersService) { }

  ngOnInit(): void {
    this.getOrders();
    this.orders$ = this.ordersService.orders$;
    console.log(this.orders$);
  }

  getOrders() {
    const token = localStorage.getItem('token');

    if (token) {
      this.ordersService.getOrders().subscribe(() => {
        console.log('Loaded ORDERS');
      }, error => {
        console.log(error);
      })
    }
  }

}
