import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductRepository } from './product.repository';

@Module({
  imports: [],
  controllers: [ProductController],
  providers: [ProductRepository],
})
export class ProductModule {}
