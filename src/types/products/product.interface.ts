import { IProductCategory } from './product-category.interface';
import { Supplier } from '../../enums/supplier.enum';

export interface IProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  supplier: Supplier;
  category: IProductCategory;
  imageUrl: string;
}
