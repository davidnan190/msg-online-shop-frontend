import { IProduct }  from './product.interface';
import { IStockData } from '../stocks/stock-data.interface';
import { Supplier } from '../../enums/supplier.enum';

export interface CreateProductRequest {
  name: string;
  description: string;
  price: number;
  weight: number;
  categoryId: string;
  supplier: Supplier;
  stockData: IStockData[];
  imageUrl?: string;
}