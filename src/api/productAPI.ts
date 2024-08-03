import { CreateProductRequest } from '../types/products/create-product-request.type';
import { HttpMethod } from '../enums/http-method.enum';
import { IProduct } from '../types/products/product.interface';
import { UpdateProductRequest } from '../types/products/update-product-request.type';
import { baseQueryWithAuth } from './baseQueryWithAuth';
import { createApi } from '@reduxjs/toolkit/query/react';

export const productAPI = createApi({
  reducerPath: 'productAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Products'],
  endpoints: (builder) => ({
    getAllProducts: builder.query<IProduct[], void>({
      query: () => ({
        url: '/products',
      }),
      keepUnusedDataFor: 120,
      providesTags: () => ['Products'],
    }),
    getProductById: builder.query<IProduct, string>({
      query: (productId) => `/products/${productId}`,
    }),
    createProduct: builder.mutation<IProduct, CreateProductRequest>({
      query: (newProductData) => ({
        url: '/products',
        method: HttpMethod.POST,
        body: newProductData,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Products']),
    }),
    updateProduct: builder.mutation<IProduct, UpdateProductRequest>({
      query: (updatedData) => ({
        url: `/products/${updatedData.id}`,
        method: HttpMethod.PATCH,
        body: updatedData,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Products']),
    }),
    deleteProduct: builder.mutation<void, string>({
      query: (productId) => ({
        url: `/products/${productId}`,
        method: HttpMethod.DELETE,
      }),
      invalidatesTags: (_, error) => (error ? [] : ['Products']),
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
