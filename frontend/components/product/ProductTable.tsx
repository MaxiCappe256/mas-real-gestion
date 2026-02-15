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
import { Pencil, Trash2 } from 'lucide-react';

export interface Product {
  id: number;
  nombre: string;
  categoria: 'Pastelería' | 'Yerbas' | 'Panificados';
  precioCosto: number;
  precioVenta: number;
}

interface ProductTableProps {
  products: Product[];
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(value);
}

const categoryColors: Record<string, string> = {
  Pastelería: 'bg-primary/10 text-primary border-primary/20',
  Yerbas: 'bg-accent/10 text-accent border-accent/20',
  Panificados: 'bg-chart-5/15 text-foreground border-chart-5/30',
};

export function ProductTable({ products }: ProductTableProps) {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
        <p className="text-lg font-medium text-muted-foreground">
          No se encontraron productos
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Intenta con otra categoria o agrega un nuevo producto.
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
              Nombre
            </TableHead>
            <TableHead className="font-semibold text-foreground">
              Categoria
            </TableHead>
            <TableHead className="text-right font-semibold text-foreground">
              Precio Costo
            </TableHead>
            <TableHead className="text-right font-semibold text-foreground">
              Precio Venta
            </TableHead>
            <TableHead className="text-right font-semibold text-foreground">
              Margen
            </TableHead>
            <TableHead className="text-center font-semibold text-foreground">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const margen = product.precioVenta - product.precioCosto;
            const margenPct =
              product.precioCosto > 0
                ? ((margen / product.precioCosto) * 100).toFixed(0)
                : '0';

            return (
              <TableRow key={product.id} className="border-border">
                <TableCell className="font-medium text-foreground">
                  {product.nombre}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={categoryColors[product.categoria] ?? ''}
                  >
                    {product.categoria}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatCurrency(product.precioCosto)}
                </TableCell>
                <TableCell className="text-right font-medium text-foreground">
                  {formatCurrency(product.precioVenta)}
                </TableCell>
                <TableCell className="text-right">
                  <span className="text-sm font-medium text-accent">
                    +{margenPct}%
                  </span>
                </TableCell>
                <TableCell>
                  <div className="flex items-center justify-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary"
                      aria-label={`Editar ${product.nombre}`}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      aria-label={`Eliminar ${product.nombre}`}
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
