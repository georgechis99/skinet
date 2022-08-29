import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketTotals } from 'src/app/shared/models/basket';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {


  basket$: Observable<IBasket>;
  basketTotal$: Observable<IBasketTotals>;


  constructor(private basketService: BasketService) { }

  ngOnInit(): void {

    this.basket$ = this.basketService.basket$;
    this.basketTotal$ = this.basketService.basketTotal$;
  }

}