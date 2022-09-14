import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { IOrder } from '../shared/models/order';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  baseUrl = environment.apiUrl;

  private ordersSource = new BehaviorSubject<IOrder[]>(null);
  orders$ = this.ordersSource.asObservable();


  constructor(private http: HttpClient) {}
  

  getOrders() {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'orders', {headers}).pipe(
      map((orders: IOrder[]) => {
        this.ordersSource.next(orders);
      })
    );
  }

  getOrderById(orderId: number) {
    const token = localStorage.getItem('token');

    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.baseUrl + 'orders/' + orderId, {headers});
  }

  
}
