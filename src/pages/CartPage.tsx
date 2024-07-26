import './CartPage.scss';

import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cart, clearCart, updateQuantity, removeFromCart } = useCart();

  if (cart.length === 0) {
    return <div className="cart-empty">Your cart is empty</div>;
  }

  const handleQuantityChange = (productId: string, quantity: number) => {
    if (quantity > 0) {
      updateQuantity(productId, quantity);
    }
  };

  const handleRemoveItem = (productId: string) => {
    removeFromCart(productId);
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <div className="cart-page">
      <h1 className="cart-title">My Shopping Cart</h1>
      {cart.map((item, index) => (
        <div key={index} className="cart-item">
          <img
            src={item.product.imageUrl}
            alt={item.product.name}
            className="cart-item-image"
          />
          <div className="cart-item-info">
            <h2 className="cart-item-name">{item.product.name}</h2>
            <div className="cart-item-quantity">
              <button
                className="quantity-btn"
                onClick={() =>
                  handleQuantityChange(item.product.id, item.quantity - 1)
                }
                disabled={item.quantity === 1}
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                className="quantity-btn"
                onClick={() =>
                  handleQuantityChange(item.product.id, item.quantity + 1)
                }
              >
                +
              </button>
            </div>
            <p className="cart-item-location">Location: {item.location}</p>
            <p className="cart-item-price">
              {(item.product.price * item.quantity).toFixed(2)} RON
            </p>
            <button
              className="btn-remove"
              onClick={() => handleRemoveItem(item.product.id)}
            >
              Remove
            </button>
          </div>
        </div>
      ))}
      <div className="cart-total">Total: {total.toFixed(2)} RON</div>
      <button className="btn-clear" onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  );
};

export default CartPage;
