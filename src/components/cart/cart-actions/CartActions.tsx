import './CartActions.scss';

import React from 'react';

type Props = {
  clearCart: () => void;
};

const CartActions: React.FC<Props> = ({ clearCart }) => {
  return (
    <div className="cart-actions">
      <button className="btn-clear" onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  );
};

export default CartActions;
