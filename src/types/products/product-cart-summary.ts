import { IProduct } from './product.interface';

export type ProductCartSummary = Omit<IProduct, 'description'>;
