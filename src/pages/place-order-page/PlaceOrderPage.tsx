import './PlaceOrderPage.scss';

import React, { useState } from 'react';

import { CartItem } from '../../components/cart/cart-item/CartItem';
import { CartTotal } from '../../components/cart/cart-total/CartTotal';
import { CreateOrderRequest } from '../../types/orders/create-order-request.type';
import { TEMP_HARDCODED_CUSTOMER_ID } from '../../constants/api.constants';
import { useCart } from '../../context/CartContext';
import { useFetchCustomer } from '../../hooks/customers/useFetchCustomer';
import { useLogger } from '../../context/LoggerContext';
import { usePlaceOrder } from '../../hooks/orders/usePlaceOrder';

export const PlaceOrderPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const {
    customer,
    isLoading: isCustomerLoading,
    error: customerError,
  } = useFetchCustomer(TEMP_HARDCODED_CUSTOMER_ID);
  const {
    isLoading: isPlaceOrderLoading,
    error: placeOrderError,
    placeOrder,
  } = usePlaceOrder();

  const [country, setCountry] = useState('');
  const [city, setCity] = useState('');
  const [county, setCounty] = useState('');
  const [streetAddress, setStreetAddress] = useState('');

  const logger = useLogger();

  const handlePlaceOrder = async () => {
    if (!customer) {
      return;
    }

    const orderData: CreateOrderRequest = {
      country,
      city,
      county,
      streetAddress,
      customerId: customer?.id,
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
        <form className="order-form">
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input
              type="text"
              id="country"
              value={country}
              onChange={(e) => setCountry(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input
              type="text"
              id="city"
              value={city}
              onChange={(e) => setCity(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="county">County</label>
            <input
              type="text"
              id="county"
              value={county}
              onChange={(e) => setCounty(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label htmlFor="streetAddress">Street Address</label>
            <input
              type="text"
              id="streetAddress"
              value={streetAddress}
              onChange={(e) => setStreetAddress(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn-place-order"
            onClick={handlePlaceOrder}
            disabled={!customer && isPlaceOrderLoading}
          >
            {isPlaceOrderLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
        {placeOrderError && <p className="error">{placeOrderError}</p>}
      </div>
    </>
  );
};
