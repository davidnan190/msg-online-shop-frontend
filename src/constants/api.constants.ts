export const BACKEND_BASE_URL =
  (import.meta.env.BACKEND_BASE_URL as string) || 'http://localhost:3555';
export const LOGIN_URL_PREFIX = '/login';
export const PRODUCTS_URL_PREFIX = '/products';
export const REGISTRATION_URL_PREFIX = '/register';
export const CART_URL_PREFIX = '/cart';
export const PLACE_ORDER_URL_PREFIX = '/place-order';
export const CREATE_PRODUCT_URL_PREFIX = 'products/create';
export const ABORT_ERROR = 'AbortError';
export const ERROR_REQUEST_CANCELLED_BY_CLIENT = 'Request canceled by client.';
export const TEMP_CUSTOMER_PICTURE_PLACEHOLDER =
  'https://via.placeholder.com/480';
