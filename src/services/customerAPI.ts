import {
  CUSTOMERS_CACHE_TAG,
  CUSTOMERS_URL_PREFIX,
} from '../constants/api.constants';

import { ICustomer } from '../types/customers/customer.interface';
import { baseApi } from './baseApi';

export const customerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCustomers: builder.query<ICustomer[], void>({
      query: () => ({
        url: CUSTOMERS_URL_PREFIX,
      }),
      keepUnusedDataFor: 120,
      providesTags: [CUSTOMERS_CACHE_TAG],
    }),
    getCustomerById: builder.query<ICustomer, string>({
      query: (customerId) => `${CUSTOMERS_URL_PREFIX}/${customerId}`,
    }),
  }),
});

export const { useGetAllCustomersQuery, useGetCustomerByIdQuery } = customerApi;
