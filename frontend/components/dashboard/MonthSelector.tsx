"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CalendarDays } from "lucide-react";

const months = [
  { value: "01", label: "Enero" },
  { value: "02", label: "Febrero" },
  { value: "03", label: "Marzo" },
  { value: "04", label: "Abril" },
  { value: "05", label: "Mayo" },
  { value: "06", label: "Junio" },
  { value: "07", label: "Julio" },
  { value: "08", label: "Agosto" },
  { value: "09", label: "Septiembre" },
  { value: "10", label: "Octubre" },
  { value: "11", label: "Noviembre" },
  { value: "12", label: "Diciembre" },
];

interface MonthSelectorProps {
  value: string; // yyyy-MM
  onValueChange: (value: string) => void;
}

export function MonthSelector({ value, onValueChange }: MonthSelectorProps) {
  const year = value.split("-")[0];
  const month = value.split("-")[1];

  function handleChange(newMonth: string) {
    onValueChange(`${year}-${newMonth}`);
  }

  return (
    <div className="flex items-center gap-3">
      <CalendarDays className="h-5 w-5 text-muted-foreground" />

      <Select value={month} onValueChange={handleChange}>
        <SelectTrigger className="w-[180px] border-border bg-card shadow-sm">
          <SelectValue placeholder="Seleccionar mes" />
        </SelectTrigger>

        <SelectContent>
          {months.map((m) => (
            <SelectItem key={m.value} value={m.value}>
              {m.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
