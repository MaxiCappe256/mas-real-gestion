"use client";

import { useState } from "react";
import { Navbar } from "@/components/navbar/Navbar";
import { MonthSelector } from "@/components/dashboard/MonthSelector";
import { ExpensesTable } from "@/components/expenses/EspensesTable";
import { NewExpenseForm } from "@/components/expenses/NewEspenseForm";
import { Receipt } from "lucide-react";
import { useCreateExpense, useExpenses } from "@/hooks/expenses/useExpenses";

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(value);
}

export default function GastosPage() {
  const currentMonth = String(new Date().getMonth() + 1).padStart(2, "0");
  const [selectedMonth, setSelectedMonth] = useState(currentMonth);

  const { mutate: createExense } = useCreateExpense();
  const { data } = useExpenses();
  const expenses = data?.data ?? [];

  const filteredExpenses = expenses
    .filter((e) => {
      const expenseMonth = new Date(e.createdAt).getMonth() + 1; // 1-12
      return String(expenseMonth).padStart(2, "0") === selectedMonth;
    })
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );

  const monthTotal = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-destructive/10">
                <Receipt className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Gastos</h1>
                <p className="text-sm text-muted-foreground">
                  {filteredExpenses.length === 1
                    ? "1 gasto registrado"
                    : `${filteredExpenses.length} gastos registrados`}
                  {" \u00b7 "}
                  Total: {formatCurrency(monthTotal)}
                </p>
              </div>
            </div>
            <MonthSelector
              value={selectedMonth}
              onValueChange={setSelectedMonth}
            />
          </div>
          {/* Expenses Table */}
          <ExpensesTable
            expenses={filteredExpenses}
            onDelete={() => console.log("delete")}
          />

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm font-medium text-muted-foreground">
              Nuevo gasto
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* New Expense Form */}
          <NewExpenseForm onSubmit={(data) => createExense(data)} />
        </div>
      </main>
    </div>
  );
}
