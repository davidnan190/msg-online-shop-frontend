import { IProduct } from '../interfaces/products/product.interface';
import { Supplier } from '../enums/supplier.enum';

export const productsMock: IProduct[] = [
  {
    id: '1',
    name: 'Mock product 1',
    weight: 120,
    price: 69.99,
    description: 'A lorem ipsum here!',
    supplier: Supplier.MSG_SUPPLIER,
    imageUrl: 'https://via.placeholder.com/500',
    category: {
      id: '1',
      name: 'Gaming',
      description: 'asdasd',
    },
  },
  {
    id: '2',
    name: 'Mock product 2',
    weight: 110,
    price: 49.99,
    description: 'A lorem ipsum here!',
    supplier: Supplier.MSG_SUPPLIER,
    imageUrl: 'https://via.placeholder.com/480',
    category: {
      id: '1',
      name: 'Gaming',
      description: 'asdasd',
    },
  },
  {
    id: '3',
    name: 'Mock product 3',
    weight: 220,
    price: 19.99,
    supplier: Supplier.MSG_SUPPLIER,
    description: 'A lorem ipsum here!',
    imageUrl: 'https://via.placeholder.com/480',
    category: {
      id: '1',
      name: 'Gaming',
      description: 'asdasd',
    },
  },

  {
    id: '4',
    name: 'Mock product 4',
    weight: 120,
    price: 69.99,
    description: 'A lorem ipsum here!',
    supplier: Supplier.MSG_SUPPLIER,
    imageUrl: 'https://via.placeholder.com/480',
    category: {
      id: '1',
      name: 'Gaming',
      description: 'asdasd',
    },
  },
  {
    id: '5',
    name: 'Mock product 5',
    weight: 110,
    price: 49.99,
    description: 'A lorem ipsum here!',
    supplier: Supplier.MSG_SUPPLIER,
    imageUrl: 'https://via.placeholder.com/480',
    category: {
      id: '1',
      name: 'Gaming',
      description: 'asdasd',
    },
  },
  {
    id: '6',
    name: 'Mock product 6',
    weight: 220,
    price: 19.99,
    supplier: Supplier.MSG_SUPPLIER,
    description: 'A lorem ipsum here!',
    imageUrl: 'https://via.placeholder.com/480',
    category: {
      id: '1',
      name: 'Gaming',
      description: 'asdasd',
    },
  },
];
