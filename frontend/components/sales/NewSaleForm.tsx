'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface ProductOption {
  nombre: string;
  precioVenta: number;
}

interface NewSaleFormProps {
  products: ProductOption[];
  onSubmit: (data: {
    producto: string;
    cantidad: number;
    precioUnitario: number;
    fecha: string;
  }) => void;
}

export function NewSaleForm({ products, onSubmit }: NewSaleFormProps) {
  const today = new Date().toISOString().split('T')[0];
  const [selectedProduct, setSelectedProduct] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [fecha, setFecha] = useState(today);

  const selectedProductData = products.find(
    (p) => p.nombre === selectedProduct,
  );

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!selectedProduct || !cantidad || !fecha || !selectedProductData) return;

    onSubmit({
      producto: selectedProduct,
      cantidad: Number(cantidad),
      precioUnitario: selectedProductData.precioVenta,
      fecha,
    });

    setSelectedProduct('');
    setCantidad('');
    setFecha(today);
  }

  const isValid =
    selectedProduct.length > 0 && Number(cantidad) > 0 && fecha.length > 0;

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          Registrar nueva venta
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="product-select"
                className="text-sm font-medium text-foreground"
              >
                Producto
              </Label>
              <Select
                value={selectedProduct}
                onValueChange={setSelectedProduct}
              >
                <SelectTrigger
                  id="product-select"
                  className="border-border bg-background shadow-sm"
                >
                  <SelectValue placeholder="Seleccionar producto" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product.nombre} value={product.nombre}>
                      {product.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="cantidad-input"
                className="text-sm font-medium text-foreground"
              >
                Cantidad
              </Label>
              <Input
                id="cantidad-input"
                type="number"
                min={1}
                placeholder="1"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                className="border-border bg-background shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="fecha-input"
                className="text-sm font-medium text-foreground"
              >
                Fecha
              </Label>
              <Input
                id="fecha-input"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="border-border bg-background shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                className="text-sm font-medium text-transparent select-none"
                aria-hidden
              >
                Accion
              </Label>
              <Button
                type="submit"
                disabled={!isValid}
                className="gap-2 shadow-sm"
              >
                <Plus className="h-4 w-4" />
                Agregar Venta
              </Button>
            </div>
          </div>

          {selectedProductData && cantidad && Number(cantidad) > 0 && (
            <p className="text-sm text-muted-foreground">
              Total estimado:{' '}
              <span className="font-semibold text-foreground">
                {new Intl.NumberFormat('es-AR', {
                  style: 'currency',
                  currency: 'ARS',
                  minimumFractionDigits: 0,
                }).format(selectedProductData.precioVenta * Number(cantidad))}
              </span>
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
