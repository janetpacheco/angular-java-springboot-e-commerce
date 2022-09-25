import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems : CartItem[] = [];
  totalPrice : Subject<number> = new Subject<number>();
  totalQuantity : Subject<number> = new Subject<number>();

  constructor() { }

  addToCart(theCartItem : CartItem ){
    let alreadyExistsInCart: boolean = false ;
    let existingCartItem: CartItem = undefined;

    for(let tempCartItem of this.cartItems){
      if (tempCartItem.id === theCartItem.id){
        existingCartItem === theCartItem;
        break;
      }
    }

    alreadyExistsInCart = (existingCartItem != undefined);

    if(alreadyExistsInCart){
      existingCartItem.quantity++;
    }
    else{
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();

  }
  computeCartTotals() {
    let totalPriceValue : number = 0;
    let totalQuantityValue : number =0;
    
    for(let currentCartItem of this.cartItems){
      totalPriceValue += currentCartItem.unitPrice * currentCartItem.quantity;
      totalQuantityValue += currentCartItem.quantity;
    }

    // publish the new values all the susbcribers will receive the new data
    this.totalPrice.next(totalPriceValue);
    this.totalQuantity.next(totalQuantityValue);

    this.logCartData(totalPriceValue, totalQuantityValue);
  }

  logCartData(totalPriceValue: number, totalQuantityValue: number) {
    console.log('Content of the cart');
    for(let tempCarItem of this.cartItems){
      const subTotalPrice = tempCarItem.quantity * tempCarItem.unitPrice;
      console.log(`name: ${tempCarItem.name}, quantity: ${tempCarItem.quantity}, unitPrice: ${tempCarItem.unitPrice}, subTotalPrice: ${subTotalPrice}`);
    }

    console.log(`totalPrice: ${totalPriceValue.toFixed(2)}, totalQuantity: ${totalQuantityValue}`)
    console.log('-----------')
  }
}
