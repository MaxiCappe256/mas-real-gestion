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
import { Trash2 } from 'lucide-react';

export interface Sale {
  id: number;
  fecha: string;
  producto: string;
  cantidad: number;
  precioUnitario: number;
}

interface SalesTableProps {
  sales: Sale[];
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

export function SalesTable({ sales, onDelete }: SalesTableProps) {
  if (sales.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
        <p className="text-lg font-medium text-muted-foreground">
          No hay ventas en este mes
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Registra una venta usando el formulario de abajo.
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
              Producto
            </TableHead>
            <TableHead className="text-right font-semibold text-foreground">
              Cantidad
            </TableHead>
            <TableHead className="text-right font-semibold text-foreground">
              Total
            </TableHead>
            <TableHead className="text-center font-semibold text-foreground">
              <span className="sr-only">Acciones</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sales.map((sale) => {
            const total = sale.cantidad * sale.precioUnitario;
            return (
              <TableRow key={sale.id} className="border-border">
                <TableCell className="text-muted-foreground">
                  {formatDate(sale.fecha)}
                </TableCell>
                <TableCell className="font-medium text-foreground">
                  {sale.producto}
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {sale.cantidad}
                </TableCell>
                <TableCell className="text-right font-medium text-foreground">
                  {formatCurrency(total)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => onDelete(sale.id)}
                      aria-label={`Eliminar venta de ${sale.producto}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
