import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateExpenseDto } from './dto/create-expense.dto';
import { UpdateExpenseDto } from './dto/update-expense.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Expense } from './entities/expense.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExpensesService {
  constructor(
    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>
  ) { }

  async create(createExpenseDto: CreateExpenseDto) {
    const expense = await this.expenseRepository.create(createExpenseDto)
    return await this.expenseRepository.save(expense)
  }

  async findAll() {
    return await this.expenseRepository.find({ order: { createdAt: 'DESC' } })
  }

  async findOne(id: number) {
    const expense = await this.expenseRepository.findOne({ where: { id } })

    if (!expense) throw new NotFoundException("Gasto no encontrado")

    return expense;
  }

  async update(id: number, updateExpenseDto: UpdateExpenseDto) {
    const expense = await this.expenseRepository.preload({
      id: id,
      ...updateExpenseDto
    })

    if (!expense) throw new NotFoundException("Gasto no encontrado")

    return await this.expenseRepository.save(expense)
  }

  async remove(id: number) {
    const expense = await this.findOne(id)

    return await this.expenseRepository.remove(expense)
  }
}
