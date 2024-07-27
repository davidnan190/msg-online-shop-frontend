import './ProductDetailsActions.scss';

import React, { useState } from 'react';

type Props = {
  onAddToCart: (desiredQuantity: number, location: string) => void;
};

const ProductDetailsActions: React.FC<Props> = ({ onAddToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [location, setLocation] = useState<string>('')
  
  return (
    <div className="product-details-actions">
    <div className="action-group">
      <label htmlFor="quantity" className="quantity-label">Quantity:</label>
      <input
        type="number"
        id="quantity"
        className="quantity-input"
        value={quantity}
        onChange={(e) => setQuantity(parseInt(e.target.value, 10))}
        min="1"
      />
    </div>
    <div className="action-group">
      <label htmlFor="location" className="location-label">Location:</label>
      <input
        type="text"
        id="location"
        className="location-input"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
    </div>
    <button className="btn btn-cart" onClick={() => onAddToCart(quantity, location)}>Add to Cart</button>
  </div>
  );
};

export default ProductDetailsActions;
