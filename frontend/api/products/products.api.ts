import { api } from '@/lib/axios'
import { CreateProductPayload, Product, ProductsResponse, UpdateProductPayload } from '@/types/product'

export const getProducts = async (): Promise<ProductsResponse> => {
  const { data } = await api.get<ProductsResponse>('/products')
  return data;
}

export const createProduct = async (payload: CreateProductPayload): Promise<Product> => {
  const { data } = await api.post('/products', payload)
  return data;
}

export const updateProduct = async (id: number, payload: UpdateProductPayload): Promise<Product> => {
  const { data } = await api.patch(`/products/${id}`, payload)
  return data;
}

export const deleteProduct = async (id: number): Promise<void> => {
  await api.delete(`/products/${id}`)
}