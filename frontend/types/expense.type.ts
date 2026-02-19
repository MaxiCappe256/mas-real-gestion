export interface CreateExpensePayload {
  description: string;
  provider: string;
  amount: number;
}

export interface Expense {
  id: number;
  description: string;
  amount: number;
  provider: string;
  createdAt: string;
}

export interface ExpensesResponse {
  data: Expense[];
}
