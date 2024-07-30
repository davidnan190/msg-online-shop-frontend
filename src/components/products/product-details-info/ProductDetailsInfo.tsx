import './ProductDetailsInfo.scss';

import { IProduct } from '../../../types/products/product.interface';
import React from 'react';

type ProductDetailsInfoProps = {
  product: IProduct;
};

export const ProductDetailsInfo: React.FC<ProductDetailsInfoProps> = ({ product }) => {
  return (
    <div className="product-info">
      <h1 className="product-name">{product.name}</h1>
      <span className="product-category">{product.category.name}</span>
      <p className="product-price">{product.price} RON</p>
      <p className="product-weight">Weight: {product.weight} kg</p>
      <p className="product-supplier">Supplier: {product.supplier}</p>
      <p className="product-description">{product.description}</p>
    </div>
  );
};
