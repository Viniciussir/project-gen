import { ProductDTO } from './dto/product.dto';
import { UpdateProductDTO } from './dto/update-product';
import { ProductEntity } from './product.entity';
import { ProductRepository } from './product.repository';
import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { v4 as uuid } from 'uuid';

@Controller('product')
export class ProductController {

    constructor(
        private productRepository: ProductRepository
    ) {}

    @Get()
    LoadlistProduct() {
        return this.productRepository.listProduct();
    }

    @Get(':id')
    searchProductById(@Param('id') id:string){
        const product = this.productRepository.searchById(id);
        return { 
            product: product
        }
    }   

    @Post()
    createNewProduct(@Body() productDTO: ProductDTO) {
        const productEntity = new ProductEntity();
        productEntity.name = productDTO.name;
        productEntity.description = productDTO.description;
        productEntity.quantity = productDTO.quantity;
        productEntity.price = productDTO.price;
        productEntity.img = productDTO.img;
        productEntity.id = uuid();
        this.productRepository.saveProduct(productEntity)
        return { 
            mensagem: 'Usuario criado com sucesso!' 
        }
    }

    @Put('/:id')
    async upadateProduct(@Param('id') id:string, @Body() newData: UpdateProductDTO){
        const usuarioAtualizado = await this.productRepository.updateProd(id, newData);

        return {
            mensagem: 'Usuario atualizado com sucesso!' 
        }
    }

    @Delete('/:id')
    async removeUsuario(@Param('id') id: string) {
        const usuarioRemovido = await this.productRepository.remove(id);
    
        return {
            mensagem: 'Usuário removido com sucesso'
        }
    }


}
