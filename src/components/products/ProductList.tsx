import { Product } from '../../interfaces/products/product.interface';
import ProductCard from './ProductCard';
import React from 'react';

type Props = {
  products: Product[];
};

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
