import { Product } from "./products/product.interface";

export interface CartItem {
  product: Product;
  quantity: number;
  location: string;
}
