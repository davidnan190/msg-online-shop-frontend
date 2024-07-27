import './ProductDetailsPage.scss';

import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import ProductDetailsActions from '../components/products/product-details-actions/ProductDetailsActions';
import ProductDetailsImage from '../components/products/product-details-image/ProductDetailsImage';
import ProductDetailsInfo from '../components/products/product-details-info/ProductDetailsInfo';
import { productsMock } from '../mocks/product.mock';
import { useCart } from '../context/CartContext';

const ProductDetailsPage: React.FC = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const product = productsMock.find((p) => p.id === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleAddToCart = (desiredQuantity: number, location: string) => {
    addToCart(product, desiredQuantity, location);
    navigate('/cart');
  };

  return (
    <div className="product-details-page">
      <h1 className="page-headline">Product Details</h1>
      <div className="product-details-card">
        <ProductDetailsImage imageUrl={product.imageUrl} />
        <div className="product-info">
          <ProductDetailsInfo product={product} />
          <ProductDetailsActions
            onAddToCart={handleAddToCart}
          />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsPage;
