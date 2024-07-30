import './CartPage.scss';

import { CartActions } from '../../components/cart/cart-actions/CartActions';
import { CartItem } from '../../components/cart/cart-item/CartItem';
import { CartTotal } from '../../components/cart/cart-total/CartTotal';
import { useCart } from '../../context/CartContext';
import { useNavigate } from 'react-router-dom';

export const CartPage: React.FC = () => {
  const { cart, clearCart } = useCart();

  const navigate = useNavigate();

  if (cart.length === 0) {
    return <div className="cart-empty">Your cart is currently empty.</div>;
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
      <div className="checkout-button-container">
        <button
          className="checkout-button"
          disabled={cart.length === 0}
          onClick={() => navigate('/place-order')}
        >
          Proceed to Checkout
        </button>
      </div>
    </>
  );
};
