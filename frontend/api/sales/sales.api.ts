import { api } from "@/lib/axios";
import { CreateSalePayload } from "@/types/sale.type";

export const getSales = async (month?: string) => {
  const { data } = await api.get("/sales", {
    params: month ? { saleMonth: month } : {},
  });

  return data;
};

export const createSale = async (payload: CreateSalePayload) => {
  const { data } = await api.post("/sales", payload);
  return data;
};

export const cancelSale = async (id: number) => {
  const { data } = await api.patch(`/sales/${id}/cancel`);
  return data;
};
