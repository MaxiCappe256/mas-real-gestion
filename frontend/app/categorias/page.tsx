'use client';

import { Navbar } from '@/components/navbar/Navbar';

import { Package } from 'lucide-react';
import { useCategories } from '@/hooks/categories/useCategories';
import { useState } from 'react';
import { CategoryTable } from '@/components/product/CategoryTable';
import { NewCategoryForm } from '@/components/product/NewCategoryForm';

export default function CategoriasPage() {
  const { data = [], createCategory, deleteCategory } = useCategories();
  const [editingCategory, setEditingCategory] = useState<{
    id: number;
    name: string;
  } | null>(null);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-6xl px-4 py-8">
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10">
              <Package className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-2xl font-bold">Categorías</h1>
          </div>

          <CategoryTable
            categories={data}
            onEdit={(category) => setEditingCategory(category)}
            onDelete={(category) => {
              if (confirm(`Eliminar "${category.name}"?`)) {
                deleteCategory.mutate(category.id);
              }
            }}
          />

          <div className="flex items-center gap-3">
            <div className="h-px flex-1 bg-border" />
            <span className="text-sm text-muted-foreground">
              {editingCategory ? 'Editar categoría' : 'Nueva categoría'}
            </span>
            <div className="h-px flex-1 bg-border" />
          </div>

          <NewCategoryForm
            initialData={editingCategory ?? undefined}
            isPending={createCategory.isPending}
            submitLabel={
              editingCategory ? 'Actualizar categoría' : 'Agregar categoría'
            }
            onSubmit={(data) => {
              createCategory.mutate(data);
              setEditingCategory(null);
            }}
          />
        </div>
      </main>
    </div>
  );
}
