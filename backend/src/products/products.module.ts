import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { SaleItem } from 'src/sales/entities/sale-item.entity';
import { Category } from 'src/categories/entities/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, SaleItem, Category])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule { }
