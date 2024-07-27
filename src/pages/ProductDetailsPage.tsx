import './ProductDetailsPage.scss';

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductDetailsImage from '../components/products/product-details-image/ProductDetailsImage';
import ProductDetailsInfo from '../components/products/product-details-info/ProductDetailsInfo';
import { productsMock } from '../mocks/product.mock';
import { useCart } from '../context/CartContext';

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = productsMock.find((p) => p.id === productId);

  const [quantity, setQuantity] = useState(1);
  const [location, setLocation] = useState('');

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(product, quantity, location);
    navigate('/cart');
  };

  return (
    <>
      <h1 className="page-headline">Product Details</h1>
      <div className="product-details-page">
        <div className="product-details-card">
          <ProductDetailsImage imageUrl={product.imageUrl} />
          <div className="product-info">
            <ProductDetailsInfo product={product} />
            <div className="product-details-actions">
              <label htmlFor="quantity" className="quantity-label">
                Quantity:
              </label>
              <input
                type="number"
                id="quantity"
                className="quantity-input"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
                min="1"
              />
              <label htmlFor="location" className="location-label">
                Location:
              </label>
              <input
                type="text"
                id="location"
                className="location-input"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
              <button className="btn btn-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailsPage;
