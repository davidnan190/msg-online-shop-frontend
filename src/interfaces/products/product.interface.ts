import { ProductCategory } from './product-category.interface';
import { Supplier } from '../../enums/supplier.enum';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  supplier: Supplier;
  category: ProductCategory;
  imageUrl: string;
}
