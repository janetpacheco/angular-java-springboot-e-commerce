import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //url for spring boot rest api
  private baseUrl = 'http://localhost:8080/api/products?size=100';

  constructor(private httpClient : HttpClient ) { }

  getProductList(theCategoryId : number ): Observable<Product[]>{
    // @ToDo build URL based on cetgory id ... 

    return this.httpClient.get<GetResponse>(this.baseUrl).pipe(
      map(response=> response._embedded.products )
    );
  }
}

interface GetResponse{
  _embedded:{
    products: Product[];
  } 
}
