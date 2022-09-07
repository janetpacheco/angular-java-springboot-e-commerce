import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../common/product';
import { map } from 'rxjs/operators'
import { ProductCategory } from '../common/product-category';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  //url for spring boot rest api
  private baseUrl = 'http://localhost:8080/api/products';
  private categoryUrl = 'http://localhost:8080/api/product-category';

  constructor(private httpClient : HttpClient ) { }

  
  
  getProductList(theCategoryId : number ): Observable<Product[]>{
    // build URL based on cetgory id ... 
    const searchUrl = `${this.baseUrl}/search/findByCategoryId?id=${theCategoryId}`;

    return this.getProducts(searchUrl);
    
  }


  getProductCategories(): Observable<ProductCategory[]>{
    return this.httpClient.get<GetResponseProductCategory>(this.categoryUrl).pipe(
      map(response=> response._embedded.productCategory )
    );
  }


  searchProducts(theKeyword: string): Observable<Product[]> {
    // build URL based on theKeyword  ... 
    const searchUrl = `${this.baseUrl}/search/findByNameContaining?name=${theKeyword}`;
    
    return this.getProducts(searchUrl);
  }


  private getProducts(searchUrl: string): Observable<Product[]> {
    return this.httpClient.get<GetResponseProducts>(searchUrl).pipe(
      map(response => response._embedded.products)
    );
  }


  getProduct(theProductId: any) {
    throw new Error('Method not implemented.');
  } 

  

  
}

interface GetResponseProducts{
  _embedded:{
    products: Product[];
  } 
}

interface GetResponseProductCategory{
  _embedded:{
    productCategory: ProductCategory[];
  } 
}
