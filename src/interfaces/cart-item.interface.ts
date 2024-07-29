import { LocationCartSummary } from '../types/locations/location-cart-summary';
import { ProductCartSummary } from '../types/products/product-cart-summary';

export interface ICartItem {
  product: ProductCartSummary;
  quantity: number;
  location: LocationCartSummary;
}
