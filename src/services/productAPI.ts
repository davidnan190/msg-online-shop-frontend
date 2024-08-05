// src/services/productApi.ts

import {
  PRODUCTS_CACHE_TAG,
  PRODUCTS_URL_PREFIX,
} from '../constants/api.constants';

import { CreateProductRequest } from '../types/products/create-product-request.type';
import { HttpMethod } from '../enums/http-method.enum';
import { IProduct } from '../types/products/product.interface';
import { UpdateProductRequest } from '../types/products/update-product-request.type';
import { baseApi } from './baseApi';

export const productApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: PRODUCTS_URL_PREFIX,
      }),
      keepUnusedDataFor: 120,
      providesTags: [PRODUCTS_CACHE_TAG],
    }),
    getProductById: builder.query<IProduct, string>({
      query: (productId) => `${PRODUCTS_URL_PREFIX}/${productId}`,
    }),
    createProduct: builder.mutation<IProduct, CreateProductRequest>({
      query: (newProductData) => ({
        url: PRODUCTS_URL_PREFIX,
        method: HttpMethod.POST,
        body: newProductData,
      }),
      invalidatesTags: [PRODUCTS_CACHE_TAG],
    }),
    updateProduct: builder.mutation<IProduct, UpdateProductRequest>({
      query: (updatedData) => ({
        url: `${PRODUCTS_URL_PREFIX}/${updatedData.id}`,
        method: HttpMethod.PATCH,
        body: updatedData,
      }),
      invalidatesTags: [PRODUCTS_CACHE_TAG],
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (productId) => ({
        url: `${PRODUCTS_URL_PREFIX}/${productId}`,
        method: HttpMethod.DELETE,
      }),
      invalidatesTags: [PRODUCTS_CACHE_TAG],
    }),
  }),
});

export const {
  useGetAllProductsQuery,
  useGetProductByIdQuery,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productApi;
