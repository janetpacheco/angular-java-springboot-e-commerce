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
    throw new Error('Method not implemented.');
  }
}
