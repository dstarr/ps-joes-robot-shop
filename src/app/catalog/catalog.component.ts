import { Component } from '@angular/core';
import { IProduct } from './product.model';

@Component({
  selector: 'bot-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.css'],
})
export class CatalogComponent {
  product: IProduct;

  constructor() {
    this.product = {
      id: 1,
      description:
        'A robot head with an unusually large eye and teloscpic neck -- excellent for exploring high spaces.',
      name: 'Large Cyclops',
      imageName: 'head-big-eye.png',
      category: 'Heads',
      price: 1220.5,
      discount: 0.2,
    };
  }

  getImageUrl(product: IProduct): string {
    return '/assets/images/robot-parts/' + product.imageName;
  }
}
