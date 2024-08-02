import { PlaceOrderSchema, placeOrderSchema } from '../../../types/schemas/place-order-schema';

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type OrderFormProps = {
  onSubmit: (data: PlaceOrderSchema) => void;
  isLoading: boolean;
  errors: any;
};

export const OrderForm: React.FC<OrderFormProps> = ({ onSubmit, isLoading, errors }) => {
  const { register, handleSubmit, formState } = useForm<PlaceOrderSchema>({
    resolver: zodResolver(placeOrderSchema),
  });

  return (
    <form className="order-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="form-group">
        <label htmlFor="country">Country</label>
        <input type="text" id="country" {...register('country')} />
        {formState.errors.country && (
          <p className="error-message">{formState.errors.country.message}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="city">City</label>
        <input type="text" id="city" {...register('city')} />
        {formState.errors.city && (
          <p className="error-message">{formState.errors.city.message}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="county">County</label>
        <input type="text" id="county" {...register('county')} />
        {formState.errors.county && (
          <p className="error-message">{formState.errors.county.message}</p>
        )}
      </div>
      <div className="form-group">
        <label htmlFor="streetAddress">Street Address</label>
        <input type="text" id="streetAddress" {...register('streetAddress')} />
        {formState.errors.streetAddress && (
          <p className="error-message">{formState.errors.streetAddress.message}</p>
        )}
      </div>
      <button
        type="submit"
        className="btn-place-order"
        disabled={isLoading}
      >
        {isLoading ? 'Placing Order...' : 'Place Order'}
      </button>
    </form>
  );
};
