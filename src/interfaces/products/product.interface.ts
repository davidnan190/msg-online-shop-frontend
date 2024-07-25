import { ProductCategory } from './product-category.interface';
import { Supplier } from '../../enums/supplier.enum';

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  weight: number;
  supplier: Supplier;
  category: ProductCategory;
  imageUrl: string;
}
