import { 
  Body, 
  Controller, 
  Delete, 
  Get, 
  Param, 
  Post, 
  Put, 
  BadRequestException, 
  InternalServerErrorException, 
  UploadedFile, 
  UseInterceptors, 
  Res, 
  HttpCode, 
  HttpStatus 
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from '@prisma/client';
import { ProductDTO } from './dto/product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService
  ) {}

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

  @Get(':id/image')
  async getProductImage(@Param('id') id: string, @Res() res: Response) {
    const idNumber = parseInt(id, 10);
    const product = await this.productService.getProductById(idNumber);

    if (product && product.img) {
      res.setHeader('Content-Type', 'image/jpeg');
      res.send(product.img);
    } else {
      res.status(404).send('Image not found');
    }
  }

  @Post()
  @UseInterceptors(FileInterceptor('img'))
  async createProduct(
    @Body() productDTO: ProductDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Product> {
    const productData = {
      name: productDTO.name,
      description: productDTO.description,
      price: productDTO.price,
      quantity: productDTO.quantity,
    };
    const imgBuffer = file ? file.buffer : null;
    return this.productService.createProduct(productData, imgBuffer);
  }

  @Put(':id')
  @UseInterceptors(FileInterceptor('img'))
  async updateProduct(
    @Param('id') id: string,
    @Body() productDTO: ProductDTO,
    @UploadedFile() file: Express.Multer.File,
  ): Promise<Product> {
    const idNumber = parseInt(id, 10);
    if (isNaN(idNumber) || idNumber <= 0) {
      throw new BadRequestException('Invalid ID');
    }

    const productData: Partial<Product> = {
      name: productDTO.name,
      description: productDTO.description,
      price: productDTO.price,
      quantity: productDTO.quantity,
    };
  
    if (file) {
      productData.img = file.buffer;
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
