import { FaShoppingCart } from 'react-icons/fa';
import React from 'react';
import { productsMock } from '../../mocks/product.mock';

const ProductDetails: React.FC = () => {
  const product = productsMock[1];

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div className="product-details">
      <div className="product-image">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-info">
        <h1 className="product-name">{product.name}</h1>
        <span className="product-category">{product.category.name}</span>
        <p className="product-price">${product.price.toFixed(2)}</p>
        <p className="product-weight">Weight: {product.weight} kg</p>
        <p className="product-supplier">Supplier: {product.supplier}</p>
        <p className="product-description">{product.description}</p>
        <button className="btn btn-cart">
          <FaShoppingCart className="icon" />
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
