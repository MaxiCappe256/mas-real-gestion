'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Trash2 } from 'lucide-react';

export interface Expense {
  id: number;
  fecha: string;
  monto: number;
  descripcion: string;
  tipo: 'Proveedor' | 'Fijo';
}

interface ExpensesTableProps {
  expenses: Expense[];
  onDelete: (id: number) => void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(value);
}

function formatDate(dateStr: string) {
  const [year, month, day] = dateStr.split('-');
  return `${day}/${month}/${year}`;
}

export function ExpensesTable({ expenses, onDelete }: ExpensesTableProps) {
  if (expenses.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
        <p className="text-lg font-medium text-muted-foreground">
          No hay gastos en este mes
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Registra un gasto usando el formulario de abajo.
        </p>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border-none bg-card shadow-md">
      <Table>
        <TableHeader>
          <TableRow className="border-border hover:bg-transparent">
            <TableHead className="font-semibold text-foreground">
              Fecha
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Descripcion
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Tipo
            </TableHead>
            <TableHead className="text-right font-semibold text-foreground">
              Monto
            </TableHead>
            <TableHead className="text-center font-semibold text-foreground">
              <span className="sr-only">Acciones</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenses.map((expense) => (
            <TableRow key={expense.id} className="border-border">
              <TableCell className="text-muted-foreground">
                {formatDate(expense.fecha)}
              </TableCell>
              <TableCell className="font-medium text-foreground">
                {expense.descripcion}
              </TableCell>
              <TableCell>
                <Badge
                  variant="secondary"
                  className={
                    expense.tipo === 'Proveedor'
                      ? 'bg-primary/10 text-primary hover:bg-primary/15'
                      : 'bg-amber-500/10 text-amber-700 hover:bg-amber-500/15'
                  }
                >
                  {expense.tipo}
                </Badge>
              </TableCell>
              <TableCell className="text-right font-medium text-foreground">
                {formatCurrency(expense.monto)}
              </TableCell>
              <TableCell>
                <div className="flex items-center justify-center">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-destructive"
                    onClick={() => onDelete(expense.id)}
                    aria-label={`Eliminar gasto: ${expense.descripcion}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
