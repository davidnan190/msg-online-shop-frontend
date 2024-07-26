// src/components/products/product-card/ProductCard.tsx

import './ProductCard.scss';

import { FaInfoCircle, FaShoppingCart } from 'react-icons/fa';
import React, { useState } from 'react';

import { Product } from '../../../interfaces/products/product.interface';
import { useCart } from '../../../context/CartContext';

type Props = {
  product: Product;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState('');

  const handleAddToCart = () => {
    addToCart(product, quantity, location);
  };

  return (
    <div className="product-card">
      <img src={product.imageUrl} alt={product.name} className="product-image" />
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <span className="product-category">{product.category.name}</span>
        <p className="product-price">{product.price.toFixed(2)} RON</p>
        <p className="product-weight">Weight: {product.weight} kg</p>
        <p className="product-supplier">Supplier: {product.supplier}</p>
      </div>
      <div className="product-actions">
        <label htmlFor="location" className="location-label">Location:</label>
        <input
          type="text"
          id="location"
          className="location-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
        />
        <label htmlFor="quantity" className="quantity-label">Quantity:</label>
        <input
          type="number"
          id="quantity"
          className="quantity-input"
          value={quantity}
          onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
          min="1"
        />
        <button className="btn btn-cart" onClick={handleAddToCart}>
          <FaShoppingCart className="icon" />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
