import { api } from "@/lib/axios";

interface SummarySection {
  count: number;
  total: number;
}

interface GetSummaryResponse {
  month: string;
  sales: SummarySection;
  expenses: SummarySection;
  profit: number;
}

export const getSummary = async (
  month?: string,
): Promise<GetSummaryResponse> => {
  const { data } = await api.get("/summary");
  return data;
};
