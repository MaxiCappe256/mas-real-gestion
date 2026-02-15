import { Type } from 'class-transformer';
import { ArrayMinSize, ValidateNested } from 'class-validator';
import { CreateSaleItemDto } from './create-sale-items.dto';

export class CreateSaleDto {

  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreateSaleItemDto)
  items: CreateSaleItemDto[];
}