import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderHistoryService {

  private ordersUrl = 'http://localhost:8080/api/orders';

  constructor(private httpClient : HttpClient) { }

  getOrderHistory(theEmail : string): Observable<GetResponseOrderHistory>{

    const orderHistoryUrl = `${this.ordersUrl}/search/findByCustomerEmailOrderByDateCreatedDesc?email=${theEmail}`;
    
    return this.httpClient.get<GetResponseOrderHistory>(orderHistoryUrl);

  }
}
  interface GetResponseOrderHistory{
    _embedded : {
      orders : OrderHistory[];
  }

}
