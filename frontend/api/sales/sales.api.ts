import { api } from "@/lib/axios";
import { CreateSalePayload } from "@/types/sale.type";

export const getSales = async (saleMonth?: string) => {
  const { data } = await api.get("/sales", {
    params: saleMonth ? { saleMonth: saleMonth } : {},
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
