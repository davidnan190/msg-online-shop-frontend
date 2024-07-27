import './CartItem.scss';

import { ICartItem } from '../../../interfaces/cart/cart-item.interface';
import React from 'react';
import { useCart } from '../../../context/CartContext';

type Props = {
  item: ICartItem
};

const CartItem: React.FC<Props> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleQuantityChange = (quantity: number) => {
    if (quantity > 0) {
      updateQuantity(item.product.id, quantity);
    }
  };

  const handleRemoveItem = () => {
    removeFromCart(item.product.id);
  };

  return (
    <div className="cart-item">
      <img src={item.product.imageUrl} alt={item.product.name} className="cart-item-image" />
      <div className="cart-item-info">
        <h2 className="cart-item-name">{item.product.name}</h2>
        <div className="cart-item-quantity">
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity - 1)}
            disabled={item.quantity === 1}
          >
            -
          </button>
          <span>{item.quantity}</span>
          <button
            className="quantity-btn"
            onClick={() => handleQuantityChange(item.quantity + 1)}
          >
            +
          </button>
        </div>
        <p className="cart-item-location">Location: {item.location}</p>
        <p className="cart-item-price">{(item.product.price * item.quantity).toFixed(2)} RON</p>
        <button className="btn-remove" onClick={handleRemoveItem}>
          Remove
        </button>
      </div>
    </div>
  );
};

export default CartItem;
