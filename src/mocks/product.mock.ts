import { Product } from "../interfaces/products/product.interface";
import { Supplier } from "../enums/supplier.enum";

export const productsMock: Product[] = [
  {
    id: 1,
    name: 'Mock product 2',
    weight: 120,
    price: 69.99,
    description: 'A lorem ipsum here!',
    supplier: Supplier.MSG_SUPPLIER,
    imageUrl: 'https://via.placeholder.com/150',
    category: {
      id: 1,
      name: 'Gaming',
      description: 'asdasd',
    },
  },
  {
    id: 2,
    name: 'Mock product 2',
    weight: 110,
    price: 49.99,
    description: 'A lorem ipsum here!',
    supplier: Supplier.MSG_SUPPLIER,
    imageUrl: 'https://via.placeholder.com/150',
    category: {
      id: 1,
      name: 'Gaming',
      description: 'asdasd',
    },
  },
  {
    id: 3,
    name: 'Mock product 3',
    weight: 220,
    price: 19.99,
    supplier: Supplier.MSG_SUPPLIER,
    description: 'A lorem ipsum here!',
    imageUrl: 'https://via.placeholder.com/150',
    category: {
      id: 1,
      name: 'Gaming',
      description: 'asdasd',
    },
  },
];