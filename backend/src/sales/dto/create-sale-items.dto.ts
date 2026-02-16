import { IsEnum, IsInt, Min } from 'class-validator';
import { PriceType } from '../enum/price-type-enum';


export class CreateSaleItemDto {
  @IsInt()
  productId: number;

  @IsInt()
  @Min(1)
  quantity: number;

  @IsEnum(PriceType, { message: "Tipo de precio no valido" })
  priceType: PriceType
}