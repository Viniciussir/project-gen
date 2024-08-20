import { Body, Controller, Delete, Get, Param, Post, Put, BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product, Prisma } from '@prisma/client';
import { ProductDTO } from './dto/product.dto';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.productService.getAllProducts();
    } catch (error) {
      console.error('Error in controller:', error);
      throw new InternalServerErrorException('Error retrieving products');
    }
  }

  @Get(':id')
  async getProductById(@Param('id') id: string): Promise<Product> {
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber) || idNumber <= 0) {
      throw new BadRequestException('Invalid ID');
    }
    try {
      const product = await this.productService.getProductById(idNumber);
      if (!product) {
        throw new BadRequestException('Product not found');
      }
      return product;
    } catch (error) {
      console.error('Error in controller:', error);
      throw new InternalServerErrorException('Error retrieving product');
    }
  }

  @Post()
  async createProduct(@Body() productDTO: ProductDTO): Promise<Product> {
    try {
      const productData: Prisma.ProductCreateInput = {
        name: productDTO.name,
        description: productDTO.description,
        price: parseFloat(productDTO.price as unknown as string),
        quantity: parseInt(productDTO.quantity as unknown as string, 10),
        img: '',
      };
      return await this.productService.createProduct(productData);
    } catch (error) {
      console.error('Error in controller:', error);
      throw new InternalServerErrorException('Error creating product');
    }
  }

  @Put(':id')
  async updateProduct(@Param('id') id: string, @Body() productData: Partial<Product>): Promise<Product> {
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber) || idNumber <= 0) {
      throw new BadRequestException('Invalid ID');
    }
    try {
      return await this.productService.updateProduct(idNumber, productData);
    } catch (error) {
      console.error('Error in controller:', error);
      throw new InternalServerErrorException('Error updating product');
    }
  }

  @Delete(':id')
  async deleteProduct(@Param('id') id: string): Promise<Product> {
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber) || idNumber <= 0) {
      throw new BadRequestException('Invalid ID');
    }
    try {
      return await this.productService.deleteProduct(idNumber);
    } catch (error) {
      console.error('Error in controller:', error);
      throw new InternalServerErrorException('Error deleting product');
    }
  }
}
