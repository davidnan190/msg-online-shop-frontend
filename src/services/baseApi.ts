import {
  AUTHORIZATION_HEADER,
  BEARER_TOKEN_PREFIX,
} from '../constants/auth.constants';
import {
  AUTH_CACHE_TAG,
  BACKEND_BASE_URL,
  CATEGORIES_CACHE_TAG,
  CUSTOMERS_CACHE_TAG,
  LOCATIONS_CACHE_TAG,
  ORDERS_CACHE_TAG,
  PRODUCTS_CACHE_TAG,
} from '../constants/api.constants';

import { LocalStorageKey } from '../enums/local-storage-key.enum';
import { RootState } from './store';
import { createApi } from '@reduxjs/toolkit/query/react';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

const baseQuery = fetchBaseQuery({
  baseUrl: BACKEND_BASE_URL,
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const accessToken =
      state.authCredentials.accessToken ||
      localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);

    if (accessToken) {
      headers.set(AUTHORIZATION_HEADER, `${BEARER_TOKEN_PREFIX}${accessToken}`);
    }
    return headers;
  },
});

export const baseApi = createApi({
  baseQuery,
  endpoints: () => ({}),
  tagTypes: [
    AUTH_CACHE_TAG,
    CATEGORIES_CACHE_TAG,
    CUSTOMERS_CACHE_TAG,
    LOCATIONS_CACHE_TAG,
    ORDERS_CACHE_TAG,
    PRODUCTS_CACHE_TAG,
  ],
});
