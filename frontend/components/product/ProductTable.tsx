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
import { Product } from '@/types/product';
import { Category } from '@/hooks/categories/useCategories';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (product: Product) => void;
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

export function ProductTable({
  products = [],
  onEdit,
  onDelete,
}: ProductTableProps) {
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card py-16">
        <p className="text-lg font-medium text-muted-foreground">
          No se encontraron productos
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Agregá un producto para comenzar.
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
              Categoría
            </TableHead>
            <TableHead className="text-right font-semibold text-foreground">
              Costo
            </TableHead>
            <TableHead className="text-right font-semibold text-foreground">
              Minorista
            </TableHead>
            <TableHead className="text-right font-semibold text-foreground">
              Mayorista
            </TableHead>
            <TableHead className="text-center font-semibold text-foreground">
              Stock
            </TableHead>
            <TableHead className="text-center font-semibold text-foreground">
              Acciones
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {(products || []).map((product) => {
            return (
              <TableRow key={product.id} className="border-border">
                <TableCell className="font-medium text-foreground">
                  {product.name}
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={categoryColors[product.category.name] ?? ''}
                  >
                    {product.category.name}
                  </Badge>
                </TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatCurrency(product.costPrice)}
                </TableCell>
                <TableCell className="text-right font-medium text-foreground">
                  {formatCurrency(product.retailPrice)}
                </TableCell>
                <TableCell className="text-right font-medium text-blue-600">
                  {formatCurrency(product.wholesalePrice)}
                </TableCell>
                <TableCell className="text-center">
                  <span className="text-sm font-medium text-accent">
                    {product.stock}
                  </span>
                </TableCell>
                <TableCell className="flex justify-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:text-primary"
                    onClick={() => onEdit(product)}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 hover:text-destructive"
                    onClick={() => onDelete(product)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
