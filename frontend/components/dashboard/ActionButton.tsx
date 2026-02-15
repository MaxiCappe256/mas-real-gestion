import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Receipt, Package } from 'lucide-react';

export function ActionButtons() {
  return (
    <div className="grid gap-4 sm:grid-cols-3">
      <Button
        asChild
        size="lg"
        className="flex h-auto flex-col items-center gap-3 bg-primary py-8 text-primary-foreground shadow-md hover:bg-primary/90"
      >
        <Link href="/ventas">
          <ShoppingCart className="!h-8 !w-8" />
          <span className="text-base font-semibold">Nueva Venta</span>
        </Link>
      </Button>

      <Button
        asChild
        size="lg"
        className="flex h-auto flex-col items-center gap-3 bg-destructive py-8 text-destructive-foreground shadow-md hover:bg-destructive/90"
      >
        <Link href="/gastos">
          <Receipt className="!h-8 !w-8" />
          <span className="text-base font-semibold">Nuevo Gasto</span>
        </Link>
      </Button>

      <Button
        asChild
        size="lg"
        className="flex h-auto flex-col items-center gap-3 bg-accent py-8 text-accent-foreground shadow-md hover:bg-accent/90"
      >
        <Link href="/productos">
          <Package className="!h-8 !w-8" />
          <span className="text-base font-semibold">Ver Productos</span>
        </Link>
      </Button>
    </div>
  );
}
