import { cancelSale, createSale, getSales } from "@/api/sales/sales.api";
import { CreateSalePayload, Sale, SalesResponse } from "@/types/sale.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { toast } from "sonner";

export interface ApiError {
  message: string;
}

export const useSales = (month?: string) => {
  return useQuery<Sale[]>({
    queryKey: ["sales", month],
    queryFn: () => getSales(month),
    retry: 1,
  });
};

export const useCreateSale = () => {
  const queryClient = useQueryClient();

  return useMutation<Sale, AxiosError<ApiError>, CreateSalePayload>({
    mutationKey: ["sales"],
    mutationFn: createSale,
    onSuccess: () => {
      toast.success("Venta creada correctamente");
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Error al crear la venta";
      toast.error(message);
    },
  });
};

export const useCancelSale = () => {
  const queryClient = useQueryClient();

  return useMutation<Sale, AxiosError<ApiError>, number>({
    mutationFn: cancelSale,
    onSuccess: () => {
      toast.message("Venta cancelada correctamente");
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Error al cancelar la venta";

      toast.error(message);
    },
  });
};
