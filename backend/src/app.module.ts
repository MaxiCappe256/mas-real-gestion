import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { ExpensesModule } from './expenses/expenses.module';
import { ResumenController } from './resumen/resumen.controller';
import { ResumenService } from './resumen/resumen.service';
import { ResumenModule } from './resumen/resumen.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        url: configService.get<string>('DATABASE_URL'),
        autoLoadEntities: true,
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      }),
    }),
    ProductsModule,
    SalesModule,
    ExpensesModule,
    ResumenModule,
  ],
})
export class AppModule { }
