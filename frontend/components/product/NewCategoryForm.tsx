'use client';

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

type FormValues = {
  name: string;
};

interface NewCategoryFormProps {
  initialData?: FormValues;
  onSubmit: (data: FormValues) => void;
  isPending: boolean;
  submitLabel?: string;
}

export function NewCategoryForm({
  initialData,
  onSubmit,
  isPending,
  submitLabel = 'Agregar categoría',
}: NewCategoryFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormValues>({
    defaultValues: initialData,
  });

  useEffect(() => {
    if (initialData) {
      reset(initialData);
    }
  }, [initialData, reset]);

  const handleFormSubmit = (data: FormValues) => {
    onSubmit(data);
    if (!initialData) reset();
  };

  return (
    <Card className="border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">{submitLabel}</CardTitle>
      </CardHeader>

      <CardContent>
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="grid gap-5 sm:grid-cols-2"
          noValidate
        >
          <div className="flex flex-col gap-1">
            <Label>Nombre</Label>
            <Input
              {...register('name', {
                required: 'El nombre es obligatorio',
              })}
            />
            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="flex flex-col gap-2">
            <Label className="invisible">Acción</Label>
            <Button type="submit" disabled={isPending}>
              {isPending ? 'Guardando...' : submitLabel}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
