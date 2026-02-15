'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { ProductTable, type Product } from '@/components/product/ProductTable';
import {
  CategoryFilter,
  type Category,
} from '@/components/product/CategoryFilter';
import { Button } from '@/components/ui/button';
import { Plus, Package } from 'lucide-react';

const mockProducts: Product[] = [
  {
    id: 1,
    nombre: 'Torta de Chocolate',
    categoria: 'Pastelería',
    precioCosto: 3500,
    precioVenta: 6000,
  },
  {
    id: 2,
    nombre: 'Medialunas x12',
    categoria: 'Panificados',
    precioCosto: 1200,
    precioVenta: 2400,
  },
  {
    id: 3,
    nombre: 'Yerba Mate 1kg',
    categoria: 'Yerbas',
    precioCosto: 2800,
    precioVenta: 4200,
  },
  {
    id: 4,
    nombre: 'Budín de Limón',
    categoria: 'Pastelería',
    precioCosto: 2000,
    precioVenta: 3800,
  },
  {
    id: 5,
    nombre: 'Pan Lactal',
    categoria: 'Panificados',
    precioCosto: 900,
    precioVenta: 1800,
  },
  {
    id: 6,
    nombre: 'Yerba Compuesta 500g',
    categoria: 'Yerbas',
    precioCosto: 1800,
    precioVenta: 2900,
  },
  {
    id: 7,
    nombre: 'Tarta de Frutilla',
    categoria: 'Pastelería',
    precioCosto: 4000,
    precioVenta: 7000,
  },
  {
    id: 8,
    nombre: 'Pan de Campo',
    categoria: 'Panificados',
    precioCosto: 1100,
    precioVenta: 2200,
  },
  {
    id: 9,
    nombre: 'Yerba Premium 1kg',
    categoria: 'Yerbas',
    precioCosto: 4500,
    precioVenta: 6500,
  },
  {
    id: 10,
    nombre: 'Alfajores x6',
    categoria: 'Pastelería',
    precioCosto: 1500,
    precioVenta: 3000,
  },
];

export default function ProductosPage() {
  const [selectedCategory, setSelectedCategory] = useState<Category>('Todas');

  const filteredProducts =
    selectedCategory === 'Todas'
      ? mockProducts
      : mockProducts.filter((p) => p.categoria === selectedCategory);

  const totalProducts = mockProducts.length;
  const filteredCount = filteredProducts.length;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-foreground text-balance">
                  Productos
                </h1>
                <p className="text-sm text-muted-foreground">
                  {filteredCount === totalProducts
                    ? `${totalProducts} productos en total`
                    : `Mostrando ${filteredCount} de ${totalProducts} productos`}
                </p>
              </div>
            </div>
            <Button className="gap-2 shadow-sm">
              <Plus className="h-4 w-4" />
              Nuevo Producto
            </Button>
          </div>

          {/* Category Filter */}
          <CategoryFilter
            selected={selectedCategory}
            onSelect={setSelectedCategory}
          />

          {/* Products Table */}
          <ProductTable products={filteredProducts} />
        </div>
      </main>
    </div>
  );
}
