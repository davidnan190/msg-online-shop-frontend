import './PlaceOrderPage.scss';

import { CartItem } from '../../components/cart/cart-item/CartItem';
import { CartTotal } from '../../components/cart/cart-total/CartTotal';
import { CreateOrderRequest } from '../../types/orders/create-order-request.type';
import { LOGIN_URL_PREFIX } from '../../constants/api.constants';
import { OrderForm } from '../../components/orders/order-form/OrderForm';
import { PlaceOrderSchema } from '../../types/schemas/place-order-schema';
import React from 'react';
import { useAuthContext } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { useLogger } from '../../context/LoggerContext';
import { useNavigate } from 'react-router-dom';
import { usePlaceOrder } from '../../hooks/orders/usePlaceOrder';

export const PlaceOrderPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { retrieveLoggedInUser } = useAuthContext();
  const loggedInUser = retrieveLoggedInUser();
  const navigate = useNavigate();

  if (!loggedInUser) {
    navigate(LOGIN_URL_PREFIX);
    return null;
  }

  const {
    isLoading: isPlaceOrderLoading,
    error: placeOrderError,
    placeOrder,
  } = usePlaceOrder();

  const logger = useLogger();

  const handlePlaceOrder = async (data: PlaceOrderSchema) => {
    if (!loggedInUser) {
      return;
    }

    const orderData: CreateOrderRequest = {
      country: data.country,
      city: data.city,
      county: data.county,
      streetAddress: data.streetAddress,
      customerId: loggedInUser.id,
      desiredOrderItems: cart.map((item) => ({
        productId: item.product.id,
        locationId: item.location.id,
        quantity: item.quantity,
      })),
    };

    const createdOrder = await placeOrder(orderData);
    logger.debug(`Created Order Data: ${createdOrder}`, {
      component: 'PlaceOrderPage',
      action: 'handlePlaceOrder',
    });
    if (createdOrder) {
      clearCart();
      alert('Order placed successfully!');
    } else if (placeOrderError) {
      alert(`Failed to place order: ${placeOrderError}`);
    }
  };

  if (cart.length === 0) {
    return <div className="cart-empty">Your cart is currently empty.</div>;
  }

  return (
    <>
      <h1 className="page-headline">Place Order</h1>
      <div className="place-order-page">
        {cart.map((item, index) => (
          <CartItem key={index} item={item} />
        ))}
        <CartTotal cart={cart} />
        <OrderForm onSubmit={handlePlaceOrder} isLoading={isPlaceOrderLoading} errors={placeOrderError} />
      </div>
    </>
  );
};
