import { combineReducers, configureStore } from '@reduxjs/toolkit';

import { authAPI } from '../api/authAPI';
import authCredentialsReducer from './authCredentialsSlice';
import { categoryAPI } from '../api/categoryAPI';
import { locationAPI } from '../api/locationAPI';
import { productAPI } from '../api/productAPI';

const rootReducer = combineReducers({
  authCredentials: authCredentialsReducer,
  [authAPI.reducerPath]: authAPI.reducer,
  [productAPI.reducerPath]: productAPI.reducer,
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
        .concat(categoryAPI.middleware)
        .concat(locationAPI.middleware),

    // .concat(logger),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispath = AppStore['dispatch'];
