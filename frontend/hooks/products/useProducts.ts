import { createProduct, deleteProduct, getProducts, updateProduct } from "@/api/products/products.api"
import { CreateProductPayload, Product, ProductsResponse, UpdateProductPayload } from "@/types/product.type"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { AxiosError } from "axios"
import { ApiError } from "next/dist/server/api-utils"
import { toast } from "sonner"

export const useProducts = () => {
  return useQuery<ProductsResponse>({
    queryKey: ['products'],
    queryFn: getProducts,
  })
}

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<Product, AxiosError<ApiError>, CreateProductPayload>({
    mutationFn: createProduct,

    onSuccess: () => {
      toast.success('Producto creado correctamente');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },

    onError: (error) => {
      const message =
        error.response?.data?.message ?? 'Error al crear el producto';

      toast.error(message);
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<
    Product,
    AxiosError<ApiError>,
    { id: number; data: UpdateProductPayload }
  >({
    mutationFn: ({ id, data }) => updateProduct(id, data),

    onSuccess: () => {
      toast.success('Producto actualizado correctamente');
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },

    onError: (error) => {
      const message = error.response?.data?.message || 'Error al actualizar el producto'
      toast.error(message)
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number>({
    mutationFn: deleteProduct,
    onSuccess: () => {
      toast.success("Producto eliminado correctamente")
      queryClient.invalidateQueries({ queryKey: ['products'] })
    },
    onError: (error: any) => {
      const message = error.response?.data?.message || 'Error al eliminar el producto'
      toast.error(message)
    }
  })
}
