import { Injectable } from '@angular/core';
import { IProduct } from './catalog/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: IProduct[] = [];

  constructor() { }

  add(product: IProduct): void {
    this.cart.push(product);
    console.log('Product added to cart:', product.name);
  }

}
