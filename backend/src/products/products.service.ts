import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Injectable()
export class ProductsService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>
  ) { }

  async create(createProductDto: CreateProductDto) {
    const WHOLESALE_MULTIPLER = 1.3;
    const RETAIL_MULTIPLER = 1.5;

    const { costPrice, name, stock, categoryId, unitType } = createProductDto

    const category = await this.categoryRepository.findOne({ where: { id: categoryId } })

    if (!category) throw new NotFoundException("Categoria no encontrada")

    const wholesalePrice = Number((costPrice * WHOLESALE_MULTIPLER).toFixed(2))
    const retailPrice = Number((costPrice * RETAIL_MULTIPLER).toFixed(2))

    const product = await this.productRepository.create({
      name,
      stock,
      costPrice,
      wholesalePrice,
      retailPrice,
      category,
      unitType,
      active: true
    })
    return await this.productRepository.save(product)
  }

  async findAll() {
    const [data, total] = await this.productRepository.findAndCount({
      relations: {
        category: true
      }
    })
    return {
      data,
      total
    }
  }

  async findOne(id: number) {
    const product = await this.productRepository.findOne({ where: { id }, relations: { category: true } })

    if (!product) throw new NotFoundException("Producto no encontrado")

    return product
  }

  async update(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } })

    if (!product) throw new NotFoundException("Producto no encontrado")

    if (updateProductDto.categoryId) {
      const category = await this.categoryRepository.findOne({ where: { id: updateProductDto.categoryId } })

      if (!category) throw new NotFoundException("Categoria no encontrada")

      product.category = category
    }

    if (updateProductDto.costPrice !== undefined) {
      const WHOLESALE_MULTIPLIER = 1.3;
      const RETAIL_MULTIPLIER = 1.5;

      product.costPrice = updateProductDto.costPrice
      product.retailPrice = Number((product.costPrice * RETAIL_MULTIPLIER).toFixed(2))
      product.wholesalePrice = Number((product.costPrice * WHOLESALE_MULTIPLIER).toFixed(2))
    }

    if (updateProductDto.name) product.name = updateProductDto.name
    if (updateProductDto.stock !== undefined) product.stock = updateProductDto.stock
    if (updateProductDto.unitType) product.unitType = updateProductDto.unitType

    return await this.productRepository.save(product)
  }

  async remove(id: number) {
    const product = await this.findOne(id)

    return await this.productRepository.remove(product)
  }
}
