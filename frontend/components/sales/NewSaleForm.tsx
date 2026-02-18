"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus, Trash2, ShoppingCart, Send, Loader2 } from "lucide-react";
import { Product } from "@/types/product.type";
import { CreateSalePayload } from "@/types/sale.type";
import { SaleItem } from "@/types/sale-item.type";

type FormValues = {
  productId: string;
  quantity: number;
  priceType: "RETAIL" | "WHOLESALE";
};

interface SaleItemTmp {
  productId: number;
  name: string;
  quantity: number; // unidades o gramos
  unitPrice: number; // precio por unidad o por KG
  priceType: "RETAIL" | "WHOLESALE";
  subtotal: number;
}

interface NewSaleFormProps {
  isPending: boolean;
  products: Product[];
  onSubmit: (data: CreateSalePayload) => void;
  saleCreated: boolean;
  onSaleConsumed: () => void;
}

export function NewSaleForm({
  products,
  onSubmit,
  saleCreated,
  onSaleConsumed,
  isPending,
}: NewSaleFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      priceType: "RETAIL",
    },
  });

  const productId = watch("productId");
  const priceType = watch("priceType");
  const quantity = watch("quantity");

  const [items, setItems] = useState<SaleItemTmp[]>([]);

  const handleAddItem = (data: FormValues) => {
    const product = products.find((p) => p.id === Number(data.productId));

    if (!product) return;

    let unitPrice: number;

    if (data.priceType === "RETAIL") {
      unitPrice = product?.retailPrice;
    } else {
      unitPrice = product?.wholesalePrice;
    }

    let subtotal: number;

    if (product.unitType === "UNIT") {
      subtotal = unitPrice * data.quantity;
    } else {
      subtotal = unitPrice * (data.quantity / 1000);
    }

    const item: SaleItemTmp = {
      productId: product.id,
      name: product.name,
      quantity: data.quantity,
      priceType: data.priceType,
      unitPrice,
      subtotal,
    };

    setItems((prev) => [...prev, item]);

    reset({
      productId: "",
      quantity: 0,
      priceType: data.priceType,
    });
  };

  const handleConfirmSale = () => {
    if (items.length === 0) return;

    const itemsDto = items.map((i) => ({
      productId: i.productId,
      quantity: i.quantity,
      priceType: i.priceType,
    }));

    onSubmit({ items: itemsDto });
  };

  // i => item | idx => posicion
  const handleRemoveItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };
  // buscar el producto seleccionado
  const product = products.find((p) => p.id === Number(productId));

  // fijarse si es unidad o peso
  const isWeight = product?.unitType === "WEIGHT" ? true : false;

  const saleUnitPrice = product
    ? priceType === "RETAIL"
      ? product.retailPrice
      : product.wholesalePrice
    : null;

  const salePriceLabel = product ? (isWeight ? "/kg" : "por unidad") : null;

  const costPrice = product?.costPrice;

  const quantityLabel = product?.unitType === "UNIT" ? "uni" : "g";

  const quantityPlaceholder = isWeight ? "Ej: 100, 250, 500" : "Ej: 1, 2, 3";

  const cartTotal = items.reduce((acc, item) => acc + item.subtotal, 0);

  const clearForm = () => {
    setItems([]);
    reset();
    onSaleConsumed();
  };

  useEffect(() => {
    if (saleCreated) {
      setItems([]);
      reset();
    }
  }, [saleCreated]);

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
          onSubmit={handleSubmit(handleAddItem)}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 items-end bg-secondary/10 p-4 rounded-xl border border-dashed"
        >
          {/* Producto */}
          <div>
            <Label className="mb-2">Producto</Label>
            <Select
              value={productId}
              onValueChange={(v) => setValue("productId", v)}
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
            ${costPrice}
          </div>

          {/* Tipo de precio */}
          <div>
            <Label className="mb-2">Tipo de precio</Label>
            <Select
              value={priceType}
              onValueChange={(v) =>
                setValue("priceType", v as "RETAIL" | "WHOLESALE")
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
            Venta: ${saleUnitPrice} {salePriceLabel}
          </div>

          {/* Cantidad */}
          <div>
            <Label className="mb-2">Cantidad {quantityLabel}</Label>
            <Input
              type="number"
              placeholder={quantityPlaceholder}
              {...register("quantity", { valueAsNumber: true })}
            />
          </div>

          {/* Agregar */}
          <Button type="submit">
            <Plus className="h-4 w-4 mr-2" /> Agregar
          </Button>
        </form>

        {/* Items cargados */}
        {items.length > 0 && (
          <>
            <table className="w-full text-sm border">
              <tbody>
                {items.map((i, idx) => (
                  <tr key={idx} className="border-t">
                    <td className="p-2">{i.name}</td>
                    <td className="p-2 text-center">
                      {i.quantity}
                      {isWeight ? " g" : ""}
                    </td>
                    <td className="p-2 text-right">
                      {isWeight ? `$${i.unitPrice} / kg` : `$${i.unitPrice}`}
                    </td>
                    <td className="p-2 text-right font-bold">
                      ${i.subtotal.toFixed(2)}
                    </td>
                    <td className="p-2 text-center">
                      <Button
                        size="icon"
                        variant="ghost"
                        onClick={() => handleRemoveItem(idx)}
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
              <span>${cartTotal}</span>
            </div>

            <Button
              onClick={handleConfirmSale}
              className="w-full"
              disabled={isPending}
            >
              {isPending ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Confirmando venta...
                </>
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" /> Confirmar venta
                </>
              )}
            </Button>
          </>
        )}
      </CardContent>
    </Card>
  );
}
