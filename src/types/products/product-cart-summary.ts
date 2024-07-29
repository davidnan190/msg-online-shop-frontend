import { IProduct } from '../../interfaces/product.interface';

export type ProductCartSummary = Omit<IProduct, 'description'>;
