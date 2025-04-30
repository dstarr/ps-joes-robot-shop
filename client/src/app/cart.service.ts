import { Injectable } from '@angular/core';
import { IProduct } from './catalog/product.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cart: IProduct[] = [];

  constructor(private http: HttpClient) { }

  add(product: IProduct): void {
    this.cart.push(product);

    this.http.post('/api/cart', this.cart).subscribe({
      next: (response) => {
        console.log('Cart updated successfully:', response);
      },
      error: (err) => {
        console.error('Error updating cart:', err);
      }
    });

    console.log('Product added to cart:', product.name);
  }

}
