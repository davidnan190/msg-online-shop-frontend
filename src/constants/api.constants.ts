export const BACKEND_BASE_URL =
  (import.meta.env.BACKEND_BASE_URL as string) || 'http://localhost:3555';
export const AUTH_URL_PREFIX = '/auth';
export const LOGIN_URL_PREFIX = '/login';
export const PRODUCTS_URL_PREFIX = '/products';
export const REGISTRATION_URL_PREFIX = '/register';
export const CART_URL_PREFIX = '/cart';
export const ORDERS_URL_PREFIX = '/orders';
export const CUSTOMERS_URL_PREFIX = '/customers';
export const CATEGORIES_URL_PREFIX = '/categories';
export const LOCATIONS_URL_PREFIX = '/locations';
export const PLACE_ORDER_URL_PREFIX = '/place-order';
export const CREATE_PRODUCT_URL_PREFIX = '/create';

export const PRODUCTS_CACHING_TAG = 'Products';
export const CATEGORIES_CACHING_TAG = 'ProductCategories';
export const LOCATIONS_CACHING_TAG = 'Locations';
export const CUSTOMERS_CACHING_TAG = 'Customers';
export const ORDERS_CACHING_TAG = 'Orders';

export const ABORT_ERROR = 'AbortError';
export const ERROR_REQUEST_CANCELLED_BY_CLIENT = 'Request canceled by client.';
export const TEMP_CUSTOMER_PICTURE_PLACEHOLDER =
  'https://via.placeholder.com/480';
