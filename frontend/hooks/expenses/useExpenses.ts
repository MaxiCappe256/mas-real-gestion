import { createExpense, getExpenses } from "@/api/expenses/expenses.api";
import {
  CreateExpensePayload,
  Expense,
  ExpensesResponse,
} from "@/types/expense.type";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { toast } from "sonner";

export const useExpenses = () => {
  return useQuery<ExpensesResponse>({
    queryKey: ["expenses"],
    queryFn: getExpenses,
  });
};

export const useCreateExpense = () => {
  const queryClient = useQueryClient();

  return useMutation<Expense, AxiosError<ApiError>, CreateExpensePayload>({
    mutationFn: createExpense,
    onSuccess: () => {
      toast.success("Gasto creado correctamente");
      queryClient.invalidateQueries({ queryKey: ["expenses"] });
    },
    onError: (error) => {
      const message =
        error.response?.data?.message || "Error al crear el gasto";
      toast.error(message);
    },
  });
};
