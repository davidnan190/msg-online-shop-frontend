import './CartTotal.scss';

import { ICartItem } from '../../../interfaces/cart-item.interface';
import React from 'react';

type Props = {
  cart: ICartItem[];
};

const CartTotal: React.FC<Props> = ({ cart }) => {
  const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return <div className="cart-total">Total: {total.toFixed(2)} RON</div>;
};

export default CartTotal;
