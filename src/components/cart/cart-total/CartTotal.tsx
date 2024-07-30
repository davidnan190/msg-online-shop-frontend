import './CartTotal.scss';

import { ICartItem } from '../../../types/cart/cart-item.interface';
import React from 'react';

type CartTotalProps = {
  cart: ICartItem[];
};

export const CartTotal: React.FC<CartTotalProps> = ({ cart }) => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return <div className="cart-total">Total: {total.toFixed(2)} RON</div>;
};
