import './AddToCartDropdown.scss';

import React, { useState } from 'react';

type Props = {
  onAddToCart: (quantity: number, location: string) => void;
};

const AddToCartDropdown: React.FC<Props> = ({ onAddToCart }) => {
  const [quantity, setQuantity] = useState<number>(1);
  const [location, setLocation] = useState<string>('');

  return (
    <div className="add-to-cart-dropdown">
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
      <button
        className="btn btn-add"
        onClick={() => onAddToCart(quantity, location)}
      >
        Add to Cart
      </button>
    </div>
  );
};

export default AddToCartDropdown;
