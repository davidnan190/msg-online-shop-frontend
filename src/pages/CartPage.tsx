import './CartPage.scss';

import CartActions from '../components/cart/cart-actions/CartActions';
import CartItem from '../components/cart/cart-item/CartItem';
import CartTotal from '../components/cart/cart-total/CartTotal';
import React from 'react';
import { useCart } from '../context/CartContext';

const CartPage: React.FC = () => {
  const { cart, clearCart } = useCart();

  if (cart.length === 0) {
    return <div className="cart-empty">Your cart is empty</div>;
  }

  return (
    <>
      <h1 className="page-headline">My Cart</h1>
      <div className="cart-page">
        {cart.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
        <CartTotal cart={cart} />
        <CartActions clearCart={clearCart} />
      </div>
    </>
  );
};

export default CartPage;
