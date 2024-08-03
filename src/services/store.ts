import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authAPI } from './authAPI';
import authCredentialsReducer from '../store/authCredentialsSlice';
import { categoryAPI } from './categoryAPI';
import { customerAPI } from './customerAPI';
import { locationAPI } from './locationAPI';
import { orderAPI } from './orderAPI';
import { productAPI } from './productAPI';

const rootReducer = combineReducers({
  authCredentials: authCredentialsReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [productAPI.reducerPath]: productAPI.reducer,
  [orderAPI.reducerPath]: orderAPI.reducer,
  [customerAPI.reducerPath]: customerAPI.reducer,
  [categoryAPI.reducerPath]: categoryAPI.reducer,
  [locationAPI.reducerPath]: locationAPI.reducer,
});

export const setupStore = (): ReturnType<typeof configureStore> => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false })
        .concat(authAPI.middleware)
        .concat(productAPI.middleware)
        .concat(orderAPI.middleware)
        .concat(customerAPI.middleware)
        .concat(categoryAPI.middleware)
        .concat(locationAPI.middleware),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispath = AppStore['dispatch'];
