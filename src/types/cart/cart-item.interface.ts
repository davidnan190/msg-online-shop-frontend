import { LocationCartSummary } from '../locations/location-cart-summary';
import { ProductCartSummary } from '../products/product-cart-summary';

export interface ICartItem {
  product: ProductCartSummary;
  quantity: number;
  location: LocationCartSummary;
}
