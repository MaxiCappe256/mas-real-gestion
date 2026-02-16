'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { MonthSelector } from '@/components/dashboard/MonthSelector';
import { SalesTable, type Sale } from '@/components/sales/SalesTable';
import { NewSaleForm } from '@/components/sales/NewSaleForm';
import { ShoppingCart } from 'lucide-react';

import { useProducts } from '@/hooks/products/useProducts';

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(value);
}

const initialSales: Sale[] = [];

export default function VentasPage() {
  /* -------------------- Data -------------------- */
  const { data: productsResponse } = useProducts();
  const products = productsResponse?.data ?? [];

  /* -------------------- State -------------------- */
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [nextId, setNextId] = useState(1);

  /* -------------------- Derived -------------------- */
  const filteredSales = sales
    .filter((s) => s.fecha.split('-')[1] === selectedMonth)
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  const monthTotal = filteredSales.reduce((sum, s) => sum + s.subtotal, 0);

  /* -------------------- Handlers -------------------- */
  function handleDelete(id: number) {
    setSales((prev) => prev.filter((s) => s.id !== id));
  }

  function handleAddSale(data: {
    items: {
      productId: number;
      quantity: number;
      priceType: 'RETAIL' | 'WHOLESALE';
    }[];
  }) {
    const today = new Date().toISOString().split('T')[0];

    const newSales: Sale[] = data.items.map((item) => {
      const product = products.find((p) => p.id === item.productId)!;

      const unitPrice =
        item.priceType === 'RETAIL'
          ? product.retailPrice
          : product.wholesalePrice;

      let subtotal = 0;

      if (product.unitType === 'UNIT') {
        subtotal = unitPrice * item.quantity;
      }

      if (product.unitType === 'WEIGHT') {
        subtotal = unitPrice * (item.quantity / 1000);
      }

      return {
        id: nextId + Math.random(),
        fecha: today,
        producto: product.name,
        cantidad: item.quantity,
        subtotal,
        unitType: product.unitType as 'UNIT' | 'WEIGHT',
      };
    });

    setSales((prev) => [...prev, ...newSales]);
    setNextId((prev) => prev + newSales.length);
  }

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <ShoppingCart className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">Ventas</h1>
                <p className="text-sm text-muted-foreground">
                  {filteredSales.length} ventas · Total{' '}
                  {formatCurrency(monthTotal)}
                </p>
              </div>
            </div>

            <MonthSelector
              value={selectedMonth}
              onValueChange={setSelectedMonth}
            />
          </div>

          {/* Tabla */}
          <SalesTable sales={filteredSales} onDelete={handleDelete} />

          {/* Form */}
          <NewSaleForm products={products} onSubmit={handleAddSale} />
        </div>
      </main>
    </div>
  );
}
