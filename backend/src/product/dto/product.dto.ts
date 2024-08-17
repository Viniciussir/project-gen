import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsString,
  IsUrl,
  MaxLength,
  Min,
  ValidateNested,
} from 'class-validator';

export class ProductDTO {
    @IsString()
    @IsNotEmpty({ message: 'Nome do produto não pode ser vazio' })
    nome: string;

    @IsString()
    @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia ' })
    @MaxLength(1000, {
        message: 'Descrição não pode ter mais que 1000 caracteres',
    })
    descricao: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(1, { message: 'O valor precisa ser maior que zero' })
    valor: number;

    @IsNumber()
    @Min(0, { message: 'Quantidade mínima inválida' })
    quantidade: number;

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(3)
    caracteristicas: string[];

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    imagens: string[];

    @IsString()
    @IsNotEmpty({ message: 'Categoria do produto não pode ser vazia' })
    categoria: string;
}
