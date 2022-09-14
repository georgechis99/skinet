import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IOrder } from 'src/app/shared/models/order';
import { BreadcrumbService } from 'xng-breadcrumb';
import { OrdersService } from '../orders.service';

@Component({
  selector: 'app-order-detailed',
  templateUrl: './order-detailed.component.html',
  styleUrls: ['./order-detailed.component.scss']
})
export class OrderDetailedComponent implements OnInit {

  order: IOrder;

  constructor(private ordersService: OrdersService,
              private activatedRoot: ActivatedRoute,
              private bcService: BreadcrumbService) {

                bcService.set('@orderDetails', '')
               }

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(){
    this.ordersService.getOrderById(+this.activatedRoot.snapshot.paramMap.get('id')).subscribe((order: IOrder) => {
      console.log(+this.activatedRoot.snapshot.paramMap.get('id'));
      this.order = order;
      this.bcService.set('@orderDetails', `Order# ${order.id} - ${order.status}`);
      console.log(order);
      console.log(order.orderItems);
    }), error => {
      console.log(error);
    }
  }
}
