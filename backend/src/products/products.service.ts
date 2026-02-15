import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) { }

  async create(createProductDto: CreateProductDto) {
    const product = await this.productRepository.create(createProductDto)
    return await this.productRepository.save(product)
  }

  async findAll() {
    const [data, total] = await this.productRepository.findAndCount()
    return {
      data,
      total
    }
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOneBy({ id })

    if (!product) throw new NotFoundException("Producto no encontrado")

    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const updatedProduct = await this.productRepository.preload({
      id: id,
      ...updateProductDto
    })

    if (!updatedProduct) throw new NotFoundException("Producto no encontrado")

    return this.productRepository.save(updatedProduct)
  }

  async remove(id: number) {
    const product = await this.findOne(id)

    return await this.productRepository.remove(product)
  }
}
