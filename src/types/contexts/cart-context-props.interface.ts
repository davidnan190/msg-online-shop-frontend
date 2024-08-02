import { ICartItem } from '../cart/cart-item.interface';
import { ILocation } from '../locations/location.interface';
import { IProduct } from '../products/product.interface';

export interface ICartContextProps {
  cart: ICartItem[];
  addToCart: (product: IProduct, quantity: number, location: ILocation) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}
