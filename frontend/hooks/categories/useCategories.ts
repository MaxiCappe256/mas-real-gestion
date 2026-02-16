import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { api } from '@/lib/axios';

export type Category = {
  id: number;
  name: string;
};

const getCategories = async (): Promise<Category[]> => {
  const { data } = await api.get('/categories');
  return data;
};

const createCategory = async (payload: { name: string }) => {
  const { data } = await api.post('/categories', payload);
  return data;
};

const deleteCategory = async (id: number) => {
  await api.delete(`/categories/${id}`);
};

export const useCategories = () => {
  const queryClient = useQueryClient();

  const categoriesQuery = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  });

  const createMutation = useMutation({
    mutationFn: createCategory,
    onSuccess: () => {
      toast.success('Categoría creada');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteCategory,
    onSuccess: () => {
      toast.success('Categoría eliminada');
      queryClient.invalidateQueries({ queryKey: ['categories'] });
    },
  });

  return {
    ...categoriesQuery,
    createCategory: createMutation,
    deleteCategory: deleteMutation,
  };
};
