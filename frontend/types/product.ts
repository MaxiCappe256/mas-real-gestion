import { Category } from "@/hooks/categories/useCategories";

export interface Product {
  id: number;
  name: string;
  categoryId: number;
  costPrice: number;
  retailPrice: number;
  wholesalePrice: number;
  category: Category;
  stock: number;
  active: boolean;
  unitType: string;
}

export interface ProductsResponse {
  data: Product[]
  total: number
}

export interface CreateProductPayload {
  name: string;
  categoryId: number;
  costPrice: number;
  stock: number;
}

export interface UpdateProductPayload {
  name?: string;
  costPrice?: number;
  stock?: number;
  categoryId?: number;
}


