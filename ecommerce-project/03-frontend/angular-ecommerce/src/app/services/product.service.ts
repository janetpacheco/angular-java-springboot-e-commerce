import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  //url for spring boot rest api
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private httpClient : HttpClient ) { }
}
