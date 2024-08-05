import { combineReducers, configureStore } from '@reduxjs/toolkit';

import authCredentialsReducer from '../store/authCredentialsSlice';
import { baseApi } from '../services/baseApi';

const rootReducer = combineReducers({
  authCredentials: authCredentialsReducer,
  [baseApi.reducerPath]: baseApi.reducer,
});

export const setupStore = (): ReturnType<typeof configureStore> => {
  return configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({ serializableCheck: false }).concat(
        baseApi.middleware
      ),
  });
};

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
