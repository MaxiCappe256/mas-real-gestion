'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { SummaryCards } from '@/components/dashboard/SummaryCards';
import { MonthSelector } from '@/components/dashboard/MonthSelector';
import { ActionButtons } from '@/components/dashboard/ActionButton';

const mockData: Record<string, { ventas: number; gastos: number }> = {
  '01': { ventas: 320000, gastos: 185000 },
  '02': { ventas: 410000, gastos: 220000 },
  '03': { ventas: 285000, gastos: 310000 },
  '04': { ventas: 390000, gastos: 195000 },
  '05': { ventas: 450000, gastos: 230000 },
  '06': { ventas: 380000, gastos: 200000 },
  '07': { ventas: 425000, gastos: 215000 },
  '08': { ventas: 360000, gastos: 190000 },
  '09': { ventas: 440000, gastos: 245000 },
  '10': { ventas: 395000, gastos: 210000 },
  '11': { ventas: 470000, gastos: 255000 },
  '12': { ventas: 520000, gastos: 280000 },
};

export default function DashboardPage() {
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, '0');
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const data = mockData[selectedMonth] ?? { ventas: 0, gastos: 0 };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
        <div className="flex flex-col gap-8">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground text-balance">
                Panel de Control
              </h1>
              <p className="mt-1 text-muted-foreground">Resumen de tu tienda</p>
            </div>
            <MonthSelector
              value={selectedMonth}
              onValueChange={setSelectedMonth}
            />
          </div>

          {/* Summary Cards */}
          <SummaryCards ventas={data.ventas} gastos={data.gastos} />

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm font-medium text-muted-foreground">
              Acciones rapidas
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Action Buttons */}
          <ActionButtons />
        </div>
      </main>
    </div>
  );
}
