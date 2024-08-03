import { HttpMethod } from '../enums/http-method.enum';
import { IOrder } from '../types/orders/order.interface';
import { PlaceOrderSchema } from '../types/schemas/place-order-schema';
import { baseQueryWithAuth } from './baseQueryWithAuth';
import { createApi } from '@reduxjs/toolkit/query/react';

export const orderAPI = createApi({
  reducerPath: 'OrderAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    placeOrder: builder.mutation<IOrder, PlaceOrderSchema>({
      query: (newOrderData) => ({
        url: '/orders',
        method: HttpMethod.POST,
        body: newOrderData,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Orders']),
    }),
  }),
});

export const { usePlaceOrderMutation } = orderAPI;
