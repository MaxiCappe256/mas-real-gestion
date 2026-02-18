import { SaleItem } from "./sale-item.type";

export interface Sale {
  id: number;
  total: number;
  createdAt: Date;
  items: SaleItem[];
  status: "COMPLETED" | "CANCELLED";
}

export type CreateSalePayload = {
  items: {
    productId: number;
    quantity: number;
    priceType: "RETAIL" | "WHOLESALE";
  }[];
};

export type SalesResponse = {
  data: Sale[];
};
