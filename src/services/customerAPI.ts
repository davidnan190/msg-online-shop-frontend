import { CUSTOMERS_CACHING_TAG, CUSTOMERS_URL_PREFIX } from '../constants/api.constants';

import { ICustomer } from '../types/customers/customer.interface';
import { baseQueryWithAuth } from './baseQueryWithAuth';
import { createApi } from '@reduxjs/toolkit/query/react';

export const customerAPI = createApi({
  reducerPath: 'customerAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: [CUSTOMERS_CACHING_TAG],
  endpoints: (builder) => ({
    getAllCustomers: builder.query<ICustomer[], void>({
      query: () => ({
        url: CUSTOMERS_URL_PREFIX,
      }),
      keepUnusedDataFor: 120,
      providesTags: () => [CUSTOMERS_CACHING_TAG],
    }),
    getCustomerById: builder.query<ICustomer, string>({
      query: (customerId) => `${CUSTOMERS_URL_PREFIX}/${customerId}`,
    }),
  }),
});

export const { useGetAllCustomersQuery, useGetCustomerByIdQuery } = customerAPI;
