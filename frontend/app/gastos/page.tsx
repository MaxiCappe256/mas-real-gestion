'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { MonthSelector } from '@/components/dashboard/MonthSelector';
import {
  ExpensesTable,
  type Expense,
} from '@/components/expenses/EspensesTable';
import { NewExpenseForm } from '@/components/expenses/NewEspenseForm';
import { Receipt } from 'lucide-react';

const initialExpenses: Expense[] = [
  {
    id: 1,
    fecha: '2026-02-02',
    monto: 15000,
    descripcion: 'Harina x 25kg',
    tipo: 'Proveedor',
  },
  {
    id: 2,
    fecha: '2026-02-05',
    monto: 8500,
    descripcion: 'Alquiler local',
    tipo: 'Fijo',
  },
  {
    id: 3,
    fecha: '2026-02-08',
    monto: 4200,
    descripcion: 'Yerba mate x 20u',
    tipo: 'Proveedor',
  },
  {
    id: 4,
    fecha: '2026-02-10',
    monto: 3500,
    descripcion: 'Servicio de luz',
    tipo: 'Fijo',
  },
  {
    id: 5,
    fecha: '2026-02-14',
    monto: 6800,
    descripcion: 'Azucar x 10kg',
    tipo: 'Proveedor',
  },
  {
    id: 6,
    fecha: '2026-02-18',
    monto: 2200,
    descripcion: 'Gas envasado',
    tipo: 'Fijo',
  },
  {
    id: 7,
    fecha: '2026-01-05',
    monto: 12000,
    descripcion: 'Chocolate cobertura x 5kg',
    tipo: 'Proveedor',
  },
  {
    id: 8,
    fecha: '2026-01-10',
    monto: 8500,
    descripcion: 'Alquiler local',
    tipo: 'Fijo',
  },
  {
    id: 9,
    fecha: '2026-01-20',
    monto: 5600,
    descripcion: 'Manteca x 10u',
    tipo: 'Proveedor',
  },
  {
    id: 10,
    fecha: '2026-03-03',
    monto: 9000,
    descripcion: 'Levadura x 20u',
    tipo: 'Proveedor',
  },
  {
    id: 11,
    fecha: '2026-03-08',
    monto: 3500,
    descripcion: 'Servicio de luz',
    tipo: 'Fijo',
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(value);
}

export default function GastosPage() {
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [expenses, setExpenses] = useState<Expense[]>(initialExpenses);
  const [nextId, setNextId] = useState(initialExpenses.length + 1);

  const filteredExpenses = expenses
    .filter((e) => {
      const expenseMonth = e.fecha.split('-')[1];
      return expenseMonth === selectedMonth;
    })
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  const monthTotal = filteredExpenses.reduce((sum, e) => sum + e.monto, 0);

  const proveedorTotal = filteredExpenses
    .filter((e) => e.tipo === 'Proveedor')
    .reduce((sum, e) => sum + e.monto, 0);

  const fijoTotal = filteredExpenses
    .filter((e) => e.tipo === 'Fijo')
    .reduce((sum, e) => sum + e.monto, 0);

  function handleDelete(id: number) {
    setExpenses((prev) => prev.filter((e) => e.id !== id));
  }

  function handleAddExpense(data: {
    monto: number;
    descripcion: string;
    tipo: 'Proveedor' | 'Fijo';
    fecha: string;
  }) {
    const newExpense: Expense = {
      id: nextId,
      ...data,
    };
    setExpenses((prev) => [...prev, newExpense]);
    setNextId((prev) => prev + 1);
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10">
                <Receipt className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground text-balance">
                  Gastos
                </h1>
                <p className="text-sm text-muted-foreground">
                  {filteredExpenses.length === 1
                    ? '1 gasto registrado'
                    : `${filteredExpenses.length} gastos registrados`}
                  {' \u00b7 '}
                  Total: {formatCurrency(monthTotal)}
                </p>
              </div>
            </div>
            <MonthSelector
              value={selectedMonth}
              onValueChange={setSelectedMonth}
            />
          </div>

          {/* Breakdown cards */}
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                <span className="text-sm font-bold text-primary">P</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Proveedores</p>
                <p className="text-lg font-bold text-foreground">
                  {formatCurrency(proveedorTotal)}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4 rounded-xl bg-card p-4 shadow-md">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10">
                <span className="text-sm font-bold text-amber-700">F</span>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Gastos Fijos</p>
                <p className="text-lg font-bold text-foreground">
                  {formatCurrency(fijoTotal)}
                </p>
              </div>
            </div>
          </div>

          {/* Expenses Table */}
          <ExpensesTable expenses={filteredExpenses} onDelete={handleDelete} />

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm font-medium text-muted-foreground">
              Nuevo gasto
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* New Expense Form */}
          <NewExpenseForm onSubmit={handleAddExpense} />
        </div>
      </main>
    </div>
  );
}
