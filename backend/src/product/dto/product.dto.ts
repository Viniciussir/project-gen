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
    name: string;

    @IsString()
    @IsNotEmpty({ message: 'Descrição do produto não pode ser vazia ' })
    @MaxLength(1000, {message: 'Descrição não pode ter mais que 1000 caracteres'})
    description: string;

    @IsNumber({ maxDecimalPlaces: 2, allowNaN: false, allowInfinity: false })
    @Min(1, { message: 'O valor precisa ser maior que zero' })
    value: number;

    @IsNumber()
    @Min(0, { message: 'Quantidade mínima inválida' })
    amount: number;

    @ValidateNested()
    @IsArray()
    @ArrayMinSize(1)
    img: string[];

    @IsString()
    isFavorited: string;
}
