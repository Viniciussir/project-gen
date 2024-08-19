import { Injectable } from '@nestjs/common';
import { ProductEntity } from './product.entity';

@Injectable()
export class ProductRepository {
  private product = [];

  listProduct() {
    return this.product;
  }

  saveProduct(dataProduct) {
    this.product.push(dataProduct);
  }

  searchById(id: string) {
    const productExists = this.product.find(
      productSave => productSave.id === id
    );

    if(!productExists) {
      throw new Error('Produto não existe');
    }

    return productExists;
}

  async updateProd(id: string, updatedata: Partial<ProductEntity>) {
    const usuario = this.searchById(id);

    Object.entries(updatedata).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      usuario[key] = value;
    });

    return usuario;
  }

  async remove(id: string){
    const product = this.searchById(id);
    this.product = this.product.filter(
        usuarioSalvo => usuarioSalvo.id !== id
    );

    return product;
}

}
