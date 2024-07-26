import './ProductDetailsInfo.scss';

import { Product } from '../../../interfaces/products/product.interface';
import React from 'react';

type Props = {
  product: Product;
};

const ProductDetailsInfo: React.FC<Props> = ({ product }) => {
  return (
    <div className="product-info">
      <h1 className="product-name">{product.name}</h1>
      <span className="product-category">{product.category.name}</span>
      <p className="product-price">{product.price.toFixed(2)} RON</p>
      <p className="product-weight">Weight: {product.weight} kg</p>
      <p className="product-supplier">Supplier: {product.supplier}</p>
      <p className="product-description">{product.description}</p>
    </div>
  );
};

export default ProductDetailsInfo;
