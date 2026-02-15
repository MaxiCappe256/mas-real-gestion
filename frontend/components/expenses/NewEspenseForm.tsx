'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus } from 'lucide-react';

interface NewExpenseFormProps {
  onSubmit: (data: {
    monto: number;
    descripcion: string;
    tipo: 'Proveedor' | 'Fijo';
    fecha: string;
  }) => void;
}

export function NewExpenseForm({ onSubmit }: NewExpenseFormProps) {
  const today = new Date().toISOString().split('T')[0];
  const [monto, setMonto] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [tipo, setTipo] = useState<string>('');
  const [fecha, setFecha] = useState(today);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!monto || !descripcion || !tipo || !fecha) return;

    onSubmit({
      monto: Number(monto),
      descripcion,
      tipo: tipo as 'Proveedor' | 'Fijo',
      fecha,
    });

    setMonto('');
    setDescripcion('');
    setTipo('');
    setFecha(today);
  }

  const isValid =
    Number(monto) > 0 &&
    descripcion.trim().length > 0 &&
    tipo.length > 0 &&
    fecha.length > 0;

  return (
    <Card className="border-none shadow-md">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          Registrar nuevo gasto
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="descripcion-input"
                className="text-sm font-medium text-foreground"
              >
                Descripcion
              </Label>
              <Input
                id="descripcion-input"
                type="text"
                placeholder="Ej: Harina x 10kg"
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                className="border-border bg-background shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="monto-input"
                className="text-sm font-medium text-foreground"
              >
                Monto ($)
              </Label>
              <Input
                id="monto-input"
                type="number"
                min={1}
                placeholder="0"
                value={monto}
                onChange={(e) => setMonto(e.target.value)}
                className="border-border bg-background shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="tipo-select"
                className="text-sm font-medium text-foreground"
              >
                Tipo
              </Label>
              <Select value={tipo} onValueChange={setTipo}>
                <SelectTrigger
                  id="tipo-select"
                  className="border-border bg-background shadow-sm"
                >
                  <SelectValue placeholder="Seleccionar tipo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Proveedor">Proveedor</SelectItem>
                  <SelectItem value="Fijo">Fijo</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col gap-2">
              <Label
                htmlFor="fecha-gasto-input"
                className="text-sm font-medium text-foreground"
              >
                Fecha
              </Label>
              <Input
                id="fecha-gasto-input"
                type="date"
                value={fecha}
                onChange={(e) => setFecha(e.target.value)}
                className="border-border bg-background shadow-sm"
              />
            </div>

            <div className="flex flex-col gap-2">
              <Label
                className="text-sm font-medium text-transparent select-none"
                aria-hidden
              >
                Accion
              </Label>
              <Button
                type="submit"
                disabled={!isValid}
                className="gap-2 shadow-sm"
              >
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
