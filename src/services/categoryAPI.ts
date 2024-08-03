import { IProductCategory } from '../types/products/product-category.interface';
import { baseQueryWithAuth } from './baseQueryWithAuth';
import { createApi } from '@reduxjs/toolkit/query/react';

export const categoryAPI = createApi({
  reducerPath: 'categoryAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['ProductCategories'],
  endpoints: (builder) => ({
    getAllCategories: builder.query<IProductCategory[], void>({
      query: () => '/categories',
      keepUnusedDataFor: 120,
      providesTags: () => ['ProductCategories'],
    }),
    getCategoryById: builder.query<IProductCategory, string>({
      query: (categoryId) => `/categories/${categoryId}`,
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery } =
  categoryAPI;
