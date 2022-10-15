import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { CartItem } from '../common/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  
  cartItems : CartItem[] = [];
  totalPrice : Subject<number> = new BehaviorSubject<number>(0);
  totalQuantity : Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage = sessionStorage;

  constructor() { 
    // data from storage
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if (data != null){
      this.cartItems = data;

      this.computeCartTotals();
    }
  }

  addToCart(theCartItem : CartItem ){
    let alreadyExistsInCart: boolean = false ;
    let existingCartItem: CartItem = undefined;

    if (this.cartItems.length > 0){

    // traditional way to declare a flow loop
    // for(let tempCartItem of this.cartItems){
    //   if (tempCartItem.id === theCartItem.id){
    //     existingCartItem = theCartItem;
    //     break;
    //   }
    // }

    existingCartItem = this.cartItems.find(tempCartItem => tempCartItem.id === theCartItem.id);


    alreadyExistsInCart = (existingCartItem != undefined);

    }

    if(alreadyExistsInCart){
      existingCartItem.quantity++;
    }
    else{
      this.cartItems.push(theCartItem);
    }

    this.computeCartTotals();

  }

  decrementQuantity(theCartItem: CartItem) {
    theCartItem.quantity--;
    if(theCartItem.quantity===0){
      this.remove(theCartItem);
    }
    else{
      this.computeCartTotals();
    }
  }

  remove(theCartItem: CartItem) {
    // get index of item in the array
    const itemIndex = this.cartItems.findIndex(
      tempCartItem => tempCartItem.id === theCartItem.id);
    // if found remove the item from the array at the given index
    if (itemIndex > -1){
      this.cartItems.splice(itemIndex, 1);
      this.computeCartTotals();
    }
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
