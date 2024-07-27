import { IProduct } from '../products/product.interface';

export interface ICartItem {
  product: IProduct;
  quantity: number;
  location: string;
}
