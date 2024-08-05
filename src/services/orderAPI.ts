import {
  ORDERS_CACHE_TAG,
  ORDERS_URL_PREFIX,
} from '../constants/api.constants';

import { HttpMethod } from '../enums/http-method.enum';
import { IOrder } from '../types/orders/order.interface';
import { PlaceOrderSchema } from '../types/schemas/place-order-schema';
import { baseApi } from './baseApi';

export const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    placeOrder: builder.mutation<IOrder, PlaceOrderSchema>({
      query: (newOrderData) => ({
        url: ORDERS_URL_PREFIX,
        method: HttpMethod.POST,
        body: newOrderData,
      }),
      invalidatesTags: [ORDERS_CACHE_TAG],
    }),
  }),
});

export const { usePlaceOrderMutation } = orderApi;
