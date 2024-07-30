import './CartActions.scss';

import React from 'react';

type CartActionsProps = {
  clearCart: () => void;
};

export const CartActions: React.FC<CartActionsProps> = ({ clearCart }) => {
  return (
    <div className="cart-actions">
      <button className="btn-clear" onClick={clearCart}>
        Clear Cart
      </button>
    </div>
  );
};
