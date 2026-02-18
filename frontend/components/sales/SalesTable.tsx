"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { Sale } from "@/types/sale.type";

interface SalesTableProps {
  sales: Sale[];
  onDelete: (id: number) => void;
  // onDelete: (id: number) => void;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(value);
}

function formatDate(date: string | Date) {
  const d = typeof date === "string" ? new Date(date) : date;

  return d.toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
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
            <TableHead>Fecha</TableHead>
            <TableHead>Producto</TableHead>
            <TableHead className="text-right">Cantidad</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-center">
              <span className="sr-only">Acciones</span>
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {sales.map((sale) => (
            <TableRow key={sale.id}>
              {/* FECHA */}
              <TableCell className="text-muted-foreground">
                {formatDate(sale.createdAt)}
              </TableCell>

              {/* PRODUCTOS */}
              <TableCell className="font-medium">
                {sale.items.map((item) => (
                  <div key={item.id}>{item.product.name}</div>
                ))}
              </TableCell>

              {/* CANTIDADES */}
              <TableCell className="text-right text-muted-foreground">
                {sale.items.map((item) => (
                  <div key={item.id}>
                    {item.quantity}{" "}
                    {item.product.unitType === "WEIGHT" ? "g" : "un"}
                  </div>
                ))}
              </TableCell>

              {/* TOTAL */}
              <TableCell className="text-right font-medium">
                ${sale.total}
              </TableCell>

              <TableCell className="text-center">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 hover:text-destructive"
                  onClick={() => onDelete(sale.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
