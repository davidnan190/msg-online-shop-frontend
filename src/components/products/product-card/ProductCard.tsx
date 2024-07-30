import './ProductCard.scss';

import { FaInfoCircle, FaShoppingCart } from 'react-icons/fa';
import React, { useState } from 'react';

import { AddToCartDropdown } from '../product-dropdown/AddToCartDropdown';
import { ILocation } from '../../../types/locations/location.interface';
import { IProduct } from '../../../types/products/product.interface';
import { Link } from 'react-router-dom';
import { useCart } from '../../../context/CartContext';

type ProductCardProps = {
  product: IProduct | undefined;
  availableLocations: ILocation[] | undefined;
};

export const ProductCard: React.FC<ProductCardProps> = ({ product, availableLocations }) => {
  const { addToCart } = useCart();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleAddToCart = (
    quantity: number,
    desiredLocation: ILocation
  ) => {
    if (product && showDropdown) {
      addToCart(product, quantity, desiredLocation);
      setShowDropdown(false);
    }
  };

  const handleAddToCartDropdown = () => {
    setShowDropdown((prevValue) => !prevValue);
  };

  return (
    <div className="product-card">
      <img src={product?.imageUrl} alt="" className="product-image" />
      <div className="product-info">
        <h2 className="product-name">{product?.name}</h2>
        <span className="product-category">{product?.category.name}</span>
        <p className="product-price">{product?.price as number} RON</p>
        <p className="product-supplier">From {product?.supplier}</p>
      </div>
      <div className="product-actions">
        <button className="btn" onClick={handleAddToCartDropdown}>
          <FaShoppingCart className="icon" />
        </button>
        <Link to={`/products/${product?.id}`} className="btn btn-details">
          <FaInfoCircle className="icon" />
        </Link>
      </div>
      {showDropdown && <AddToCartDropdown onAddToCart={handleAddToCart} availableLocations={availableLocations} />}
    </div>
  );
};
