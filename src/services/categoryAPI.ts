import {
  CATEGORIES_CACHE_TAG,
  CATEGORIES_URL_PREFIX,
} from '../constants/api.constants';

import { IProductCategory } from '../types/products/product-category.interface';
import { baseApi } from './baseApi';

export const categoryApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCategories: builder.query<IProductCategory[], void>({
      query: () => CATEGORIES_URL_PREFIX,
      keepUnusedDataFor: 120,
      providesTags: [CATEGORIES_CACHE_TAG],
    }),
    getCategoryById: builder.query<IProductCategory, string>({
      query: (categoryId) => `${CATEGORIES_URL_PREFIX}/${categoryId}`,
    }),
  }),
});

export const { useGetAllCategoriesQuery, useGetCategoryByIdQuery } =
  categoryApi;
