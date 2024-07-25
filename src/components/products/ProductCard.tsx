import { FaInfoCircle, FaShoppingCart } from 'react-icons/fa';

import { Product } from '../../interfaces/products/product.interface';
import React from 'react';

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  return (
    <div className="product-detail">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <span className="product-category">{product.category.name}</span>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-weight">Weight: {product.weight} kg</p>
        <p className="product-supplier">Supplier: {product.supplier}</p>
        {/* <p className="product-description">{product.description}</p> */}
      </div>
      <div className="product-actions">
        <button className="btn btn-details">
          <FaInfoCircle className="icon" />
        </button>
        <button className="btn btn-cart">
          <FaShoppingCart className="icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
