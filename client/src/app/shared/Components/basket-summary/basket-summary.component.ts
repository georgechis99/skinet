import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { OrdersService } from 'src/app/orders/orders.service';
import { IBasket, IBasketItem } from '../../models/basket';
import { IOrder, IOrderItem } from '../../models/order';

@Component({
  selector: 'app-basket-summary',
  templateUrl: './basket-summary.component.html',
  styleUrls: ['./basket-summary.component.scss']
})
export class BasketSummaryComponent implements OnInit {

  constructor(private basketService: BasketService, 
              private ordersService: OrdersService) { }
  basket$: Observable<IBasket>;
  order$: Observable<IOrder>;

  @Output() decrement: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() increment: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();
  @Output() remove: EventEmitter<IBasketItem> = new EventEmitter<IBasketItem>();

  @Input() isBasket = true;
  @Input() isOrder = false;
  @Input() items: IOrderItem[] = null;

  ngOnInit(): void {
    this.basket$ = this.basketService.basket$;
  }

  decrementItemQuantity(item: IBasketItem){
    this.decrement.emit(item);
  }

  incrementItemQuantity(item: IBasketItem){
    this.increment.emit(item);
  }

  removeBasketItem(item: IBasketItem){
    this.remove.emit(item);
  }

}
