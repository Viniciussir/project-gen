import { Injectable, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prisma: PrismaService) {}

  async getAllProducts(): Promise<Product[]> {
    try {
      return await this.prisma.product.findMany();
    } catch (error) {
      console.error('Error fetching products:', error);
      throw new InternalServerErrorException('Error retrieving products');
    }
  }

  async getProductById(id: number): Promise<Product> {
    if (id <= 0) {
      throw new BadRequestException('Invalid ID');
    }
    try {
      const product = await this.prisma.product.findUnique({ where: { id } });
      if (!product) {
        throw new BadRequestException('Product not found');
      }
      return product;
    } catch (error) {
      console.error('Error fetching product:', error);
      throw new InternalServerErrorException('Error retrieving product');
    }
  }

  async createProduct(productData: Prisma.ProductCreateInput, imgBuffer: Buffer | null): Promise<Product> {
    try {
      const newProductData: Prisma.ProductCreateInput = {
        ...productData,
        price: parseFloat(productData.price as any), // Converter para float
        quantity: parseInt(productData.quantity as any, 10), // Converter para inteiro
        img: imgBuffer ?? null,
      };
  
      return await this.prisma.product.create({
        data: newProductData,
      });
    } catch (error) {
      console.error('Error in service:', error);
      throw new InternalServerErrorException('Error creating product');
    }
  }
  
  async updateProduct(id: number, productData: Partial<Product>): Promise<Product> {
    if (id <= 0) {
      throw new BadRequestException('Invalid ID');
    }
    const existingProduct = await this.prisma.product.findUnique({ where: { id } });
    if (!existingProduct) {
      throw new BadRequestException('Product not found');
    }
  
    const dataToUpdate: Prisma.ProductUpdateInput = {
      ...productData,
      price: productData.price ? parseFloat(productData.price as any) : undefined,
      quantity: productData.quantity ? parseInt(productData.quantity as any, 10) : undefined,
      img: productData.img !== undefined ? productData.img : existingProduct.img,
    };
  
    try {
      return await this.prisma.product.update({ where: { id }, data: dataToUpdate });
    } catch (error) {
      console.error('Error updating product:', error);
      throw new InternalServerErrorException('Error updating product');
    }
  }
  
  async deleteProduct(id: number): Promise<Product> {
    if (id <= 0) {
      throw new BadRequestException('Invalid ID');
    }
    try {
      const existingProduct = await this.prisma.product.findUnique({ where: { id } });
      if (!existingProduct) {
        throw new BadRequestException('Product not found');
      }
      return await this.prisma.product.delete({ where: { id } });
    } catch (error) {
      console.error('Error deleting product:', error);
      throw new InternalServerErrorException('Error deleting product');
    }
  }

}