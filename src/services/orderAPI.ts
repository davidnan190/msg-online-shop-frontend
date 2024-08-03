import { ORDERS_CACHING_TAG, ORDERS_URL_PREFIX } from '../constants/api.constants';

import { HttpMethod } from '../enums/http-method.enum';
import { IOrder } from '../types/orders/order.interface';
import { PlaceOrderSchema } from '../types/schemas/place-order-schema';
import { baseQueryWithAuth } from './baseQueryWithAuth';
import { createApi } from '@reduxjs/toolkit/query/react';

export const orderAPI = createApi({
  reducerPath: 'OrderAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: [ORDERS_CACHING_TAG],
  endpoints: (builder) => ({
    placeOrder: builder.mutation<IOrder, PlaceOrderSchema>({
      query: (newOrderData) => ({
        url: ORDERS_URL_PREFIX,
        method: HttpMethod.POST,
        body: newOrderData,
      }),
      invalidatesTags: (_, error) => (error ? [] : [ORDERS_CACHING_TAG]),
    }),
  }),
});

export const { usePlaceOrderMutation } = orderAPI;
