'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
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
import { Plus, Trash2, ShoppingCart, Send } from 'lucide-react';
import { Product } from '@/types/product';

type FormValues = {
  productId: string;
  quantity: number;
  priceType: 'RETAIL' | 'WHOLESALE';
};

interface SaleItemTmp {
  productId: number;
  name: string;
  quantity: number;
  unitPrice: number;
  priceType: 'RETAIL' | 'WHOLESALE';
  subtotal: number;
}

interface NewSaleFormProps {
  products: Product[];
  onSubmit: (data: {
    items: {
      productId: number;
      quantity: number;
      priceType: 'RETAIL' | 'WHOLESALE';
    }[];
  }) => void;
}

export function NewSaleForm({ products, onSubmit }: NewSaleFormProps) {
  const { register, handleSubmit, reset, watch, setValue } =
    useForm<FormValues>({
      defaultValues: {
        priceType: 'RETAIL',
      },
    });

  const [items, setItems] = useState<SaleItemTmp[]>([]);

  const productId = watch('productId');
  const quantity = watch('quantity');
  const priceType = watch('priceType');

  const product = products.find((p) => p.id === Number(productId));

  const unitPrice =
    product && priceType === 'RETAIL'
      ? product.retailPrice
      : (product?.wholesalePrice ?? 0);

  function addItem(data: FormValues) {
    if (!product || !data.quantity) return;

    setItems((prev) => [
      ...prev,
      {
        productId: product.id,
        name: product.name,
        quantity: data.quantity,
        unitPrice,
        priceType: data.priceType,
        subtotal: unitPrice * data.quantity,
      },
    ]);

    reset({ productId: '', quantity: 0, priceType });
  }

  function removeItem(index: number) {
    setItems((prev) => prev.filter((_, i) => i !== index));
  }

  function submitSale() {
    onSubmit({
      items: items.map((i) => ({
        productId: i.productId,
        quantity: i.quantity,
        priceType: i.priceType,
      })),
    });

    setItems([]);
  }

  const total = items.reduce((sum, i) => sum + i.subtotal, 0);

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShoppingCart className="h-5 w-5 text-primary" />
          Nueva Venta
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col gap-6">
        {/* Item actual */}
        <form
          onSubmit={handleSubmit(addItem)}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end bg-secondary/10 p-4 rounded-xl border border-dashed"
        >
          <div>
            <Label className="mb-2">Producto</Label>
            <Select
              value={productId}
              onValueChange={(v) => setValue('productId', v)}
            >
              <SelectTrigger>
                <SelectValue placeholder="Seleccionar..." />
              </SelectTrigger>
              <SelectContent>
                {products
                  .filter((p) => p.active)
                  .map((p) => (
                    <SelectItem key={p.id} value={String(p.id)}>
                      {p.name}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2">Tipo de precio</Label>
            <Select
              value={priceType}
              onValueChange={(v) =>
                setValue('priceType', v as 'RETAIL' | 'WHOLESALE')
              }
            >
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="RETAIL">Minorista</SelectItem>
                <SelectItem value="WHOLESALE">Mayorista</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label className="mb-2">Cantidad</Label>
            <Input
              type="number"
              {...register('quantity', { valueAsNumber: true, min: 1 })}
            />
          </div>

          <Button type="submit">
            <Plus className="h-4 w-4 mr-2" /> Agregar
          </Button>
        </form>

        {/* Items */}
        {items.length > 0 && (
          <>
            <table className="w-full text-sm border">
              <tbody>
                {items.map((i, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">{i.name}</td>
                    <td className="p-2 text-center">{i.quantity}</td>
                    <td className="p-2 text-right">${i.unitPrice}</td>
                    <td className="p-2 text-right font-bold">${i.subtotal}</td>
                    <td className="p-2 text-center">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => removeItem(idx)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex justify-between font-bold">
              <span>Total</span>
              <span>${total}</span>
            </div>

            <Button onClick={submitSale} className="w-full">
              <Send className="h-4 w-4 mr-2" /> Confirmar venta
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
