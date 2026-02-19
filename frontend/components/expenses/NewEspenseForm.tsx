"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";

export interface NewExpenseFormInputs {
  description: string;
  amount: number;
  provider: string;
  createdAt: string;
}

interface NewExpenseFormProps {
  onSubmit: (data: NewExpenseFormInputs) => void;
}

export function NewExpenseForm({ onSubmit }: NewExpenseFormProps) {
  const today = new Date().toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewExpenseFormInputs>({
    defaultValues: { createdAt: today },
  });

  const submitHandler = (data: NewExpenseFormInputs) => {
    console.log(data);
    onSubmit(data);
    reset({ createdAt: today });
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          Registrar nuevo gasto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form
          onSubmit={handleSubmit(submitHandler)}
          className="flex flex-col gap-5"
        >
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {/* Descripción */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="descripcion-input">Descripción</Label>
              <Input
                id="descripcion-input"
                type="text"
                placeholder="Ej: Harina x 10kg"
                {...register("description", {
                  required: "La descripción es obligatoria",
                })}
              />
              {errors.description && (
                <span className="text-sm text-red-500">
                  {errors.description.message}
                </span>
              )}
            </div>

            {/* Monto */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="amount-input">Monto ($)</Label>
              <Input
                id="amount-input"
                type="number"
                min={1}
                placeholder="0"
                {...register("amount", {
                  required: "El monto es obligatorio",
                  min: { value: 1, message: "El monto debe ser mayor a 0" },
                  valueAsNumber: true,
                })}
              />
              {errors.amount && (
                <span className="text-sm text-red-500">
                  {errors.amount.message}
                </span>
              )}
            </div>

            {/* Proveedor */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="provider-input">Proveedor</Label>
              <Input
                id="provider-input"
                placeholder="Ej: Gime Salas Rosario..."
                {...register("provider", {
                  required: "El proveedor es obligatorio",
                })}
              />
              {errors.provider && (
                <span className="text-sm text-red-500">
                  {errors.provider.message}
                </span>
              )}
            </div>

            {/* Fecha */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="createdAt-input">Fecha</Label>
              <Input
                id="createdAt-input"
                type="date"
                {...register("createdAt", {
                  required: "La fecha es obligatoria",
                })}
              />
              {errors.createdAt && (
                <span className="text-sm text-red-500">
                  {errors.createdAt.message}
                </span>
              )}
            </div>

            {/* Botón */}
            <div className="flex flex-col gap-2">
              <Label className="text-transparent select-none">Acción</Label>
              <Button type="submit" className="gap-2 shadow-sm">
                <Plus className="h-4 w-4" />
                Agregar Gasto
              </Button>
            </div>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
