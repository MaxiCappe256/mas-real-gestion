import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResumenService } from './resumen.service';
import { ResumenController } from './resumen.controller';
import { Sale } from 'src/sales/entities/sale.entity';
import { Expense } from 'src/expenses/entities/expense.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([Sale, Expense]),
  ],
  controllers: [ResumenController],
  providers: [ResumenService],
})
export class ResumenModule { }
