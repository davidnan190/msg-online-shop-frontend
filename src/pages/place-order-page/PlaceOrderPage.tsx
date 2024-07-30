import './PlaceOrderPage.scss';

import CartItem from '../../components/cart/cart-item/CartItem';
import CartTotal from '../../components/cart/cart-total/CartTotal';
import { CreateOrderRequest } from '../../types/orders/create-order-request.type';
import React from 'react';
import { TEMP_HARDCODED_CUSTOMER_ID } from '../../constants/api.constants';
import log from '../../utils/log.utils';
import { useCart } from '../../context/CartContext';
import useFetchCustomer from '../../hooks/customers/useFetchCustomer';
import { useForm } from 'react-hook-form';
import usePlaceOrder from '../../hooks/orders/usePlaceOrder';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const schema = z.object({
  country: z.string().min(3, 'Country is required'),
  city: z.string().min(3, 'City is required'),
  county: z.string().min(3, 'County is required'),
  streetAddress: z.string().min(3, 'Street address is required'),
});
type FormData = z.infer<typeof schema>;

const PlaceOrderPage: React.FC = () => {
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

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    if (!customer) {
      return;
    }

    const orderData: CreateOrderRequest = {
      country: data.country,
      city: data.city,
      county: data.county,
      streetAddress: data.streetAddress,
      customerId: customer?.id,
      desiredOrderItems: cart.map((item) => ({
        productId: item.product.id,
        locationId: item.location.id,
        quantity: item.quantity,
      })),
    };

    const createdOrder = await placeOrder(orderData);
    log.debug(orderData);
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
        <form className="order-form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="country">Country</label>
            <input type="text" id="country" {...register('country')} />
            {errors.country && (
              <p className="error-message">{errors.country.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="city">City</label>
            <input type="text" id="city" {...register('city')} />
            {errors.city && (
              <p className="error-message">{errors.city.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="county">County</label>
            <input type="text" id="county" {...register('county')} />
            {errors.county && (
              <p className="error-message">{errors.county.message}</p>
            )}
          </div>
          <div className="form-group">
            <label htmlFor="streetAddress">Street Address</label>
            <input
              type="text"
              id="streetAddress"
              {...register('streetAddress')}
            />
            {errors.streetAddress && (
              <p className="error-message">{errors.streetAddress.message}</p>
            )}
          </div>
          <button
            type="submit"
            className="btn-place-order"
            disabled={!customer || isPlaceOrderLoading}
          >
            {isPlaceOrderLoading ? 'Placing Order...' : 'Place Order'}
          </button>
        </form>
        {placeOrderError && <p className="error">{placeOrderError}</p>}
      </div>
    </>
  );
};

export default PlaceOrderPage;
