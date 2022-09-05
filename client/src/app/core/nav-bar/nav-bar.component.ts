import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { Observable } from 'rxjs';
import { AccountService } from 'src/app/account/account.service';
import { BasketService } from 'src/app/basket/basket.service';
import { IBasket, IBasketTotals } from 'src/app/shared/models/basket';
import { IUser } from 'src/app/shared/models/user';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {


  basket$: Observable<IBasket>;
  basketTotal$: Observable<IBasketTotals>;
  currentUser$: Observable<IUser>;


  constructor(private basketService: BasketService,
              private accountService: AccountService) { }

  ngOnInit(): void {

    this.basket$ = this.basketService.basket$;
    this.basketTotal$ = this.basketService.basketTotal$;
    this.currentUser$ = this.accountService.currentUser$;
  }

  logout() {
    this.accountService.logout();
  }

}