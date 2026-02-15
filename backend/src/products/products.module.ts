import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { SaleItem } from 'src/sales/entities/sale-item.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, SaleItem])],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
