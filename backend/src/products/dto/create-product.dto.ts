import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'La categoria es obligatoria' })
  @IsString()
  category: string;

  @IsNumber()
  price: number;

  @IsInt()
  stock: number;

  @IsBoolean()
  active: boolean;
}
