import { Product } from "./product.type";
import { Sale } from "./sale.type";

export interface SaleItem {
  id: number;
  quantity: number;
  unit_price: number;
  subtotal: number;
  priceType: 'RETAIL' | "WHOLESALE",
  product: Product
}

