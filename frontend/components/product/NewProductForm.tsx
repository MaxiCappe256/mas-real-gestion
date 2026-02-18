"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Category = {
  id: number;
  name: string;
};

type FormValues = {
  name: string;
  categoryId: number;
  costPrice: number;
  stock: number;
  unitType: "UNIT" | "WEIGHT";
};

interface NewProductFormProps {
  initialData?: FormValues;
  categories?: Category[];
  onSubmit: (data: FormValues) => void;
  isPending: boolean;
  submitLabel?: string;
}

export function NewProductForm({
  initialData,
  onSubmit,
  categories = [],
  isPending,
  submitLabel = "Agregar Producto",
}: NewProductFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: {
      unitType: "UNIT",
      ...initialData,
    },
  });

  useEffect(() => {
    if (initialData) reset(initialData);
  }, [initialData, reset]);

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{submitLabel}</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
          noValidate
        >
          {/* Nombre */}
          <div className="flex flex-col gap-1">
            <Label>Nombre</Label>
            <Input
              {...register("name", { required: "El nombre es obligatorio" })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          {/* Categoría */}
          <div className="flex flex-col gap-1">
            <Label>Categoría</Label>
            <select
              {...register("categoryId", {
                required: "La categoría es obligatoria",
                valueAsNumber: true,
              })}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
              defaultValue=""
            >
              <option value="" disabled>
                Seleccioná una categoría
              </option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>

            {errors.categoryId && (
              <p className="text-sm text-destructive">
                {errors.categoryId.message}
              </p>
            )}
          </div>

          {/* Tipo de unidad */}
          <div className="flex flex-col gap-1">
            <Label>Tipo de unidad</Label>
            <select
              {...register("unitType", {
                required: "El tipo de unidad es obligatorio",
              })}
              className="h-10 rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="UNIT">Por unidad</option>
              <option value="WEIGHT">Por peso (g)</option>
            </select>

            {errors.unitType && (
              <p className="text-sm text-destructive">
                {errors.unitType.message}
              </p>
            )}
          </div>

          {/* Costo */}
          <div className="flex flex-col gap-1">
            <Label>Costo (kg)</Label>
            <Input
              type="number"
              {...register("costPrice", {
                required: "El costo es obligatorio",
                valueAsNumber: true,
                min: { value: 1, message: "Debe ser mayor a 0" },
              })}
            />
            {errors.costPrice && (
              <p className="text-sm text-destructive">
                {errors.costPrice.message}
              </p>
            )}
          </div>

          {/* Stock */}
          <div className="flex flex-col gap-1">
            <Label>Stock (g)</Label>
            <Input
              type="number"
              {...register("stock", {
                required: "El stock es obligatorio",
                valueAsNumber: true,
                min: { value: 0, message: "No puede ser negativo" },
              })}
            />
            {errors.stock && (
              <p className="text-sm text-destructive">{errors.stock.message}</p>
            )}
          </div>

          {/* Botón */}
          <div className="flex flex-col gap-2">
            <Label className="invisible">Acción</Label>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Guardando..." : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
