import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { endOfMonth, isValid, startOfMonth, parse } from 'date-fns';
import { Expense } from 'src/expenses/entities/expense.entity';
import { Sale } from 'src/sales/entities/sale.entity';
import { Between, Repository } from 'typeorm';

@Injectable()
export class ResumenService {
  constructor(
    @InjectRepository(Sale)
    private readonly saleRepository: Repository<Sale>,

    @InjectRepository(Expense)
    private readonly expenseRepository: Repository<Expense>,
  ) { }

  async getSummary(month?: string) {
    let dateFilter: any = {}

    if (month) {
      const date = parse(month, 'yyyy-MM', new Date())

      if (!isValid(date)) throw new BadRequestException("Fecha no valida")

      const start = startOfMonth(date)
      const end = endOfMonth(date)

      dateFilter = {
        createdAt: Between(start, end)
      }
    }

    const [sales, salesCount] = await this.saleRepository.findAndCount({
      where: {
        status: "COMPLETED",
        ...dateFilter
      }
    })

    const [expenses, expensesCount] = await this.expenseRepository.findAndCount({
      where: dateFilter
    })

    const totalSales = sales.reduce(
      (acc, sale) => acc + Number(sale.total),
      0,
    );

    const totalExpenses = expenses.reduce(
      (acc, exp) => acc + Number(exp.amount),
      0,
    );

    return {
      month: month ?? 'ALL',
      sales: {
        count: salesCount,
        total: totalSales,
      },
      expenses: {
        count: expensesCount,
        total: totalExpenses,
      },
      profit: totalSales - totalExpenses,
    };
  }
}
