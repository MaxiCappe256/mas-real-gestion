"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { MonthSelector } from "@/components/dashboard/MonthSelector";
import { SalesTable } from "@/components/sales/SalesTable";
import { NewSaleForm } from "@/components/sales/NewSaleForm";
import { ShoppingCart } from "lucide-react";

import { useProducts } from "@/hooks/products/useProducts";
import { useCancelSale, useCreateSale, useSales } from "@/hooks/sales/useSales";
import { CreateSalePayload } from "@/types/sale.type";

export default function VentasPage() {
  /* -------------------- UI State -------------------- */
  const currentMonth = `${new Date().getFullYear()}-${String(
    new Date().getMonth() + 1,
  ).padStart(2, "0")}`;

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  /* -------------------- Data -------------------- */
  const { data: productsResponse } = useProducts();
  const { data: sales = [], isLoading } = useSales(selectedMonth);
  const { mutate: createSale, isPending: confirmLoading } = useCreateSale();
  const { mutate: cancelSale } = useCancelSale();
  const products = productsResponse?.data ?? [];
  const [saleCreated, setSaleCreated] = useState(false);

  /* -------------------- Handlers -------------------- */
  function handleCreateSale(data: CreateSalePayload) {
    createSale(data, {
      onSuccess: handleSaleSuccess,
    });
  }

  function handleSaleSuccess() {
    setSaleCreated(true);
  }

  function handleSaleConsumed() {
    setSaleCreated(false);
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
                <p className="text-sm text-muted-foreground"></p>
              </div>
            </div>

            <MonthSelector
              value={selectedMonth}
              onValueChange={setSelectedMonth}
            />
          </div>

          {/* Tabla */}
          {isLoading ? (
            <p className="text-blue-500 text-center text-xl mt-2 font-bold">
              Cargando ventas...
            </p>
          ) : (
            <SalesTable sales={sales} onDelete={cancelSale} />
          )}

          {/* Form */}
          <NewSaleForm
            isPending={confirmLoading}
            products={products}
            onSubmit={handleCreateSale}
            saleCreated={saleCreated}
            onSaleConsumed={handleSaleConsumed}
          />
        </div>
      </main>
    </div>
  );
}
