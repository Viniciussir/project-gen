import { ProductDTO } from './dto/product.dto';
import { ProductRepository } from './product.repository';
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('product')
export class ProductController {

    constructor(
        private readonly productRepository: ProductRepository
    ) {}

    @Get()
    LoadlistProduct() {
        return this.productRepository.listProduct();
    }

    @Post()
    createNewProduct(@Body() productDTO: ProductDTO) {
      const productRegistered = this.productRepository.saveProduct(productDTO);
      return productRegistered;
    }

}
