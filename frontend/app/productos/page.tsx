'use client';

import { useState } from 'react';
import { Navbar } from '@/components/navbar/Navbar';
import { ProductTable } from '@/components/product/ProductTable';
import { NewProductForm } from '@/components/product/NewProductForm';
import { Button } from '@/components/ui/button';
import { Package } from 'lucide-react';

import {
  useCreateProduct,
  useDeleteProduct,
  useProducts,
  useUpdateProduct,
} from '@/hooks/products/useProducts';

import { useCategories } from '@/hooks/categories/useCategories';
import { Product } from '@/types/product';

export default function ProductosPage() {
  /* -------------------- Queries -------------------- */
  const { data: productsResponse } = useProducts();
  const { data: categories = [] } = useCategories();

  const products = productsResponse?.data ?? [];
  const totalProducts = productsResponse?.total ?? 0;

  /* -------------------- Mutations -------------------- */
  const { mutate: createProduct, isPending } = useCreateProduct();
  const { mutate: deleteProduct } = useDeleteProduct();
  const { mutate: updateProduct, isPending: isUpdating } = useUpdateProduct();

  /* -------------------- State -------------------- */
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null,
  );

  /* -------------------- Filter -------------------- */
  const filteredProducts = selectedCategoryId
    ? products.filter((product) => product.category.id === selectedCategoryId)
    : products;

  /* -------------------- UI -------------------- */
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8 lg:px-6">
        <div className="flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">Productos</h1>
              <p className="text-sm text-muted-foreground">
                {filteredProducts.length} de {totalProducts} productos
              </p>
            </div>
          </div>

          {/* Filtro por categorías */}
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant={selectedCategoryId === null ? 'default' : 'outline'}
              onClick={() => setSelectedCategoryId(null)}
            >
              Todas
            </Button>

            {categories.map((category) => (
              <Button
                key={category.id}
                size="sm"
                variant={
                  selectedCategoryId === category.id ? 'default' : 'outline'
                }
                onClick={() => setSelectedCategoryId(category.id)}
              >
                {category.name}
              </Button>
            ))}
          </div>

          {/* Tabla */}
          <ProductTable
            products={filteredProducts}
            onEdit={setEditingProduct}
            onDelete={(product) => deleteProduct(product.id)}
          />

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm font-medium text-muted-foreground">
              {editingProduct ? 'Editar producto' : 'Nuevo producto'}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          {/* Formulario */}
          <NewProductForm
            categories={categories}
            initialData={editingProduct ?? undefined}
            isPending={isPending || isUpdating}
            submitLabel={
              editingProduct ? 'Actualizar producto' : 'Agregar producto'
            }
            onSubmit={(data) => {
              if (editingProduct) {
                updateProduct({ id: editingProduct.id, data });
                setEditingProduct(null);
              } else {
                createProduct(data);
              }
            }}
          />
        </div>
      </main>
    </div>
  );
}
