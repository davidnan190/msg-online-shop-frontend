import { Product } from '../../interfaces/products/product.interface';
import React from 'react';

type Props = {
  product: Product;
};

const ProductDetail: React.FC<Props> = ({ product }) => {
  return (
    <div className="product-detail">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <span className="product-category">{product.category.name}</span>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-weight">{product.weight} kg</p>
        <p className="product-description">{product.description}</p>
        <div className="product-actions">
          <button className="btn btn-details">Details</button>
          <button className="btn btn-cart">Add to Cart</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
