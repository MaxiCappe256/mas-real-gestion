import { api } from "@/lib/axios";
import {
  CreateExpensePayload,
  Expense,
  ExpensesResponse,
} from "@/types/expense.type";

export const createExpense = async (
  payload: CreateExpensePayload,
): Promise<Expense> => {
  const { data } = await api.post("/expenses", payload);
  return data;
};

export const getExpenses = async (): Promise<ExpensesResponse> => {
  const { data } = await api.get("/expenses");
  return data;
};
