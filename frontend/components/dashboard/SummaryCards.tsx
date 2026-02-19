import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign } from "lucide-react";

interface SummaryCardsProps {
  gastos: number;
  totalVentas: number;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    minimumFractionDigits: 0,
  }).format(value);
}

export function SummaryCards({ gastos, totalVentas }: SummaryCardsProps) {
  // const resultado = ventas - gastos;
  // const isPositive = resultado >= 0;

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Ventas del Mes
          </CardTitle>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <TrendingUp className="h-5 w-5 text-primary" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-foreground">
            {formatCurrency(totalVentas)}
          </p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Total Gastos del Mes
          </CardTitle>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10">
            <TrendingDown className="h-5 w-5 text-destructive" />
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold text-foreground">
            {formatCurrency(gastos)}
          </p>
        </CardContent>
      </Card>

      <Card className="border-none shadow-md sm:col-span-2 lg:col-span-1">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <CardTitle className="text-sm font-medium text-muted-foreground">
            Resultado del Mes
          </CardTitle>
          <div
            className={`flex h-10 w-10 items-center justify-center rounded-full ${{
              totalVentas,
            }}`}
          >
            {/* <DollarSign
              className={`h-5 w-5 ${
                isPositive ? "text-accent" : "text-destructive"
              }`}
            /> */}
          </div>
        </CardHeader>
        <CardContent>
          {/* <p
            className={`text-3xl font-bold ${
             //  isPositive ? "text-accent" : "text-destructive"
            }`}
          > */}
          {/* {formatCurrency(resultado)} */}
          {/* </p>
          <p className="mt-1 text-sm text-muted-foreground">
            {isPositive ? "Ganancia" : "Perdida"}
          </p> */}
        </CardContent>
      </Card>
    </div>
  );
}
