import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';
import { UnitType } from '../enum/unit-type-enum';

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

  @IsEnum(UnitType, { message: "Tipo de unidad invalido" })
  unitType: UnitType

  @IsInt({ message: 'La categoría es obligatoria' })
  categoryId: number;
}
