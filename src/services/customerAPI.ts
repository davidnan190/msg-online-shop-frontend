import { ICustomer } from '../types/customers/customer.interface';
import { baseQueryWithAuth } from './baseQueryWithAuth';
import { createApi } from '@reduxjs/toolkit/query/react';

export const customerAPI = createApi({
  reducerPath: 'customerAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Customers'],
  endpoints: (builder) => ({
    getAllCustomers: builder.query<ICustomer[], void>({
      query: () => ({
        url: '/customers',
      }),
      keepUnusedDataFor: 120,
      providesTags: () => ['Customers'],
    }),
    getCustomerById: builder.query<ICustomer, string>({
      query: (customerId) => `/customers/${customerId}`,
    }),
  }),
});

export const { useGetAllCustomersQuery, useGetCustomerByIdQuery } = customerAPI;
