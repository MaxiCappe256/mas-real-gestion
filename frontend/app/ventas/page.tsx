'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { MonthSelector } from '@/components/dashboard/MonthSelector';
import { SalesTable, type Sale } from '@/components/sales/SalesTable';
import { NewSaleForm } from '@/components/sales/NewSaleForm';
import { ShoppingCart } from 'lucide-react';

const products = [
  { nombre: 'Torta de Chocolate', precioVenta: 6000 },
  { nombre: 'Medialunas x12', precioVenta: 2400 },
  { nombre: 'Yerba Mate 1kg', precioVenta: 4200 },
  { nombre: 'Budín de Limón', precioVenta: 3800 },
  { nombre: 'Pan Lactal', precioVenta: 1800 },
  { nombre: 'Yerba Compuesta 500g', precioVenta: 2900 },
  { nombre: 'Tarta de Frutilla', precioVenta: 7000 },
  { nombre: 'Pan de Campo', precioVenta: 2200 },
  { nombre: 'Yerba Premium 1kg', precioVenta: 6500 },
  { nombre: 'Alfajores x6', precioVenta: 3000 },
];

const initialSales: Sale[] = [
  {
    id: 1,
    fecha: '2026-02-03',
    producto: 'Torta de Chocolate',
    cantidad: 2,
    precioUnitario: 6000,
  },
  {
    id: 2,
    fecha: '2026-02-05',
    producto: 'Medialunas x12',
    cantidad: 5,
    precioUnitario: 2400,
  },
  {
    id: 3,
    fecha: '2026-02-07',
    producto: 'Yerba Mate 1kg',
    cantidad: 3,
    precioUnitario: 4200,
  },
  {
    id: 4,
    fecha: '2026-02-10',
    producto: 'Pan Lactal',
    cantidad: 4,
    precioUnitario: 1800,
  },
  {
    id: 5,
    fecha: '2026-02-12',
    producto: 'Tarta de Frutilla',
    cantidad: 1,
    precioUnitario: 7000,
  },
  {
    id: 6,
    fecha: '2026-01-08',
    producto: 'Alfajores x6',
    cantidad: 6,
    precioUnitario: 3000,
  },
  {
    id: 7,
    fecha: '2026-01-15',
    producto: 'Budín de Limón',
    cantidad: 3,
    precioUnitario: 3800,
  },
  {
    id: 8,
    fecha: '2026-01-22',
    producto: 'Yerba Premium 1kg',
    cantidad: 2,
    precioUnitario: 6500,
  },
  {
    id: 9,
    fecha: '2026-03-02',
    producto: 'Pan de Campo',
    cantidad: 8,
    precioUnitario: 2200,
  },
  {
    id: 10,
    fecha: '2026-03-10',
    producto: 'Medialunas x12',
    cantidad: 4,
    precioUnitario: 2400,
  },
];

function formatCurrency(value: number) {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    minimumFractionDigits: 0,
  }).format(value);
}

export default function VentasPage() {
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);
  const [sales, setSales] = useState<Sale[]>(initialSales);
  const [nextId, setNextId] = useState(initialSales.length + 1);

  const filteredSales = sales
    .filter((s) => {
      const saleMonth = s.fecha.split('-')[1];
      return saleMonth === selectedMonth;
    })
    .sort((a, b) => b.fecha.localeCompare(a.fecha));

  const monthTotal = filteredSales.reduce(
    (sum, s) => sum + s.cantidad * s.precioUnitario,
    0,
  );

  function handleDelete(id: number) {
    setSales((prev) => prev.filter((s) => s.id !== id));
  }

  function handleAddSale(data: {
    producto: string;
    cantidad: number;
    precioUnitario: number;
    fecha: string;
  }) {
    const newSale: Sale = {
      id: nextId,
      fecha: data.fecha,
      producto: data.producto,
      cantidad: data.cantidad,
      precioUnitario: data.precioUnitario,
    };
    setSales((prev) => [...prev, newSale]);
    setNextId((prev) => prev + 1);
  }

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
                <h1 className="text-2xl font-bold text-foreground text-balance">
                  Ventas
                </h1>
                <p className="text-sm text-muted-foreground">
                  {filteredSales.length === 1
                    ? '1 venta registrada'
                    : `${filteredSales.length} ventas registradas`}
                  {' \u00b7 '}
                  Total: {formatCurrency(monthTotal)}
                </p>
              </div>
            </div>
            {/* Divider */}
            <div className="flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-sm font-medium text-muted-foreground">
                Nueva venta
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>
            <MonthSelector
              value={selectedMonth}
              onValueChange={setSelectedMonth}
            />
          </div>

          {/* Sales Table */}
          <SalesTable sales={filteredSales} onDelete={handleDelete} />

          {/* New Sale Form */}
          <NewSaleForm products={products} onSubmit={handleAddSale} />
        </div>
      </main>
    </div>
  );
}
