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

  @IsNotEmpty({ message: 'El precio de costo es obligatorio' })
  @IsNumber()
  costPrice: number;

  @IsNotEmpty({ message: 'El stock es obligatorio' })
  @IsInt()
  stock: number;

  @IsInt({ message: 'La categoría es obligatoria' })
  categoryId: number;
}
