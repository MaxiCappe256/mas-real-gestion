import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Sale } from './entities/sale.entity';
import { FindManyOptions, Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';
import { SaleItem } from './entities/sale-item.entity';
import { DataSource } from 'typeorm';
import { startOfMonth, parse, endOfMonth, parseISO, startOfDay, isValid, endOfDay } from 'date-fns';
import { Between } from 'typeorm';
import { PriceType } from './enum/price-type-enum';


@Injectable()
export class SalesService {

  constructor(
    private readonly dataSource: DataSource,

    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,

    @InjectRepository(SaleItem)
    private readonly saleItemRepository: Repository<SaleItem>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

  ) { }

  async create(createSaleDto: CreateSaleDto) {

    return this.dataSource.transaction(async (manager) => {
      // crear la venta vacia
      const sale = await manager.create(Sale, {
        total: 0,
        status: "COMPLETED"
      });

      // guardar la venta vacia
      await manager.save(sale)

      let total = 0

      // recorrer los productos
      for (const item of createSaleDto.items) {

        // buscar el producto
        const product = await manager.findOne(Product, {
          where: { id: item.productId, active: true }
        })

        // validar que exista producto
        if (!product) throw new NotFoundException("Producto no encontrado")

        // validar stock
        if (product.stock < item.quantity) throw new BadRequestException("Stock insuficiente del producto")

        let unitPrice: number;

        if (item.priceType === PriceType.WHOLESALE) {
          unitPrice = product.wholesalePrice
        } else {
          unitPrice = product.retailPrice
        }

        let subtotal = 0

        if (product.unitType === "UNIT") subtotal = unitPrice * item.quantity;

        if (product.unitType === "WEIGHT") {
          const kg = item.quantity / 1000
          subtotal = unitPrice * kg;
        }

        const saleItem = manager.create(SaleItem, {
          sale,
          product,
          quantity: item.quantity,
          unitPrice,
          subtotal,
          priceType: item.priceType,
          unitType: product.unitType
        });

        await manager.save(saleItem)

        //descontar stock
        product.stock -= item.quantity
        await manager.save(product)

        total += subtotal;
      }

      sale.total = total
      await manager.save(sale)

      return sale
    })

  }

  async findAll(saleMonth: string) {

    const options: FindManyOptions = {

      where: { status: 'COMPLETED' },
      relations: {
        items: true
      }
    }

    if (saleMonth) {
      const date = parse(saleMonth, 'yyyy-MM', new Date());

      if (!isValid(date)) throw new BadRequestException("Fecha no valida")

      const start = startOfMonth(date)
      const end = endOfMonth(date)

      options.where = {
        status: 'COMPLETED',
        createdAt: Between(start, end)
      }
    }

    return await this.saleRepository.find(options)
  }

  async findOne(id: number) {
    const sale = await this.saleRepository.findOne({
      where: { id },
      relations: {
        items: {
          product: true
        }
      }
    })

    if (!sale) throw new NotFoundException("Venta no encontrada")

    return sale;
  }

  async cancel(id: number) {
    return this.dataSource.transaction(async (manager) => {
      // buscamos la venta
      const sale = await manager.findOne(Sale, {
        where: { id },
        relations: {
          items: {
            product: true
          }
        }
      })

      // verificamos que exista
      if (!sale) throw new NotFoundException("Venta no encontrada")

      // verificamos que no haya sido cancelada
      if (sale.status === 'CANCELLED') throw new BadRequestException("La venta ya esta cancelada")

      // recorremos cada item de la venta para devolver el stock
      for (const item of sale.items) {
        item.product.stock += item.quantity
        await manager.save(item.product)
      }

      // marcamos a venta cancelada
      sale.status = 'CANCELLED';

      // guardamos la venta
      await manager.save(sale)

      return sale;
    })
  }
}
