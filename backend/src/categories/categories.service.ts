import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/products/entities/product.entity';

@Injectable()
export class CategoriesService {

  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,

    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) { }

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.categoryRepository.create(createCategoryDto)

    return await this.categoryRepository.save(category)
  }

  async findAll() {
    return await this.categoryRepository.find()
  }

  async findOne(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } })

    if (!category) throw new NotFoundException("Categoria no encontrada")

    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const updatedCategory = await this.categoryRepository.preload({
      id: id,
      ...updateCategoryDto
    })

    if (!updatedCategory) throw new NotFoundException("Categoria no encontrada")

    return await this.categoryRepository.save(updatedCategory);
  }

  async remove(id: number) {
    const category = await this.findOne(id)

    const productsCount = await this.productRepository.count({
      where: { category: { id } }
    })

    if (productsCount > 0) throw new BadRequestException("No se puede eliminar una categoria con productos asociados")

    return await this.categoryRepository.remove(category)
  }
}
