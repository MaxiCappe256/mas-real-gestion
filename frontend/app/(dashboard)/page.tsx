"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { SummaryCards } from "@/components/dashboard/SummaryCards";
import { MonthSelector } from "@/components/dashboard/MonthSelector";
import { ActionButtons } from "@/components/dashboard/ActionButton";
import { useResume } from "@/hooks/resumes/useResume";

export default function DashboardPage() {
  const now = new Date();
  const currentMonth = `${now.getFullYear()}-${String(
    now.getMonth() + 1,
  ).padStart(2, "0")}`;

  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const { data: summary, isLoading, isError } = useResume(selectedMonth);

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
          <SummaryCards
            ventas={summary?.sales.total ?? 0}
            gastos={summary?.expenses.total ?? 0}
          />

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
