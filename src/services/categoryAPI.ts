import { CATEGORIES_CACHING_TAG, CATEGORIES_URL_PREFIX } from '../constants/api.constants';

import { IProductCategory } from '../types/products/product-category.interface';
import { baseQueryWithAuth } from './baseQueryWithAuth';
import { createApi } from '@reduxjs/toolkit/query/react';

export const categoryAPI = createApi({
  reducerPath: 'categoryAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: [CATEGORIES_CACHING_TAG],
  endpoints: (builder) => ({
    getAllCategories: builder.query<IProductCategory[], void>({
      query: () => CATEGORIES_URL_PREFIX,
      keepUnusedDataFor: 120,
      providesTags: () => [CATEGORIES_CACHING_TAG],
    }),
    getCategoryById: builder.query<IProductCategory, string>({
      query: (categoryId) => `${CATEGORIES_URL_PREFIX}/${categoryId}`,
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery } =
  categoryAPI;
