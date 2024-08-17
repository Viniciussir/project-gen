import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  private product = [];

  listProduct() {
    return this.product;
  }

  saveProduct(dataProduct) {
    this.product.push(dataProduct);
  }

}
