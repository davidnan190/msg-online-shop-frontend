import { Product } from '../../interfaces/products/product.interface';
import ProductDetail from './ProductDetail';
import React from 'react';

type Props = {
  products: Product[];
};

const ProductList: React.FC<Props> = ({ products }) => {
  return (
    <div className="product-list">
      {products.map((product) => (
        <ProductDetail key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductList;
