import './ProductCard.scss';

import { FaInfoCircle, FaShoppingCart } from 'react-icons/fa';
import React, { useState } from 'react';

import AddToCartDropdown from '../product-dropdown/AddToCartDropdown';
import { IProduct } from '../../../interfaces/products/product.interface';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

type Props = {
  product: IProduct;
};

const ProductCard: React.FC<Props> = ({ product }) => {
  const { addToCart } = useCart();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddToCart = (desiredQuantity: number, location: string) => {
    if (showDropdown) {
      addToCart(product, desiredQuantity, location);
      setShowDropdown(false);
    }
  };

  const handleAddToCartDropdown = () => {
    setShowDropdown((prevValue) => !prevValue);
  };

  return (
    <div className="product-card">
      <img
        src={product.imageUrl}
        alt={product.name}
        className="product-image"
      />
      <div className="product-info">
        <h2 className="product-name">{product.name}</h2>
        <span className="product-category">{product.category.name}</span>
        <p className="product-price">{product.price.toFixed(2)} RON</p>
        <p className="product-supplier">From {product.supplier}</p>
      </div>
      <div className="product-actions">
        <button className="btn" onClick={handleAddToCartDropdown}>
          <FaShoppingCart className="icon" />
        </button>
        <Link to={`/products/${product.id}`} className="btn btn-details">
          <FaInfoCircle className="icon" />
        </Link>
      </div>
      {showDropdown && <AddToCartDropdown onAddToCart={handleAddToCart} />}
    </div>
  );
};

export default ProductCard;
