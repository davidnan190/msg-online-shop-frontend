import { PRODUCTS_CACHING_TAG, PRODUCTS_URL_PREFIX } from '../constants/api.constants';

import { CreateProductRequest } from '../types/products/create-product-request.type';
import { HttpMethod } from '../enums/http-method.enum';
import { IProduct } from '../types/products/product.interface';
import { UpdateProductRequest } from '../types/products/update-product-request.type';
import { baseQueryWithAuth } from './baseQueryWithAuth';
import { createApi } from '@reduxjs/toolkit/query/react';

export const productAPI = createApi({
  reducerPath: 'productAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: [PRODUCTS_CACHING_TAG],
  endpoints: (builder) => ({
    getAllProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: PRODUCTS_URL_PREFIX,
      }),
      keepUnusedDataFor: 120,
      providesTags: () => [PRODUCTS_CACHING_TAG],
    }),
    getProductById: builder.query<IProduct, string>({
      query: (productId) => `${PRODUCTS_URL_PREFIX}/${productId}`,
    }),
    createProduct: builder.mutation<IProduct, CreateProductRequest>({
      query: (newProductData) => ({
        url: '/products',
        method: HttpMethod.POST,
        body: newProductData,
      }),
      invalidatesTags: (_, error) => (error ? [] : [PRODUCTS_CACHING_TAG]),
    }),
    updateProduct: builder.mutation<IProduct, UpdateProductRequest>({
      query: (updatedData) => ({
        url: `${PRODUCTS_URL_PREFIX}/${updatedData.id}`,
        method: HttpMethod.PATCH,
        body: updatedData,
      }),
      invalidatesTags: (_, error) => (error ? [] : [PRODUCTS_CACHING_TAG]),
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: HttpMethod.DELETE,
      }),
      invalidatesTags: (_, error) => (error ? [] : [PRODUCTS_CACHING_TAG]),
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productAPI;
