import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { IAuthCredentialsState } from '../types/auth/auth-credentials.interface';
import { LocalStorageKey } from '../enums/local-storage-key.enum';

const initialState: IAuthCredentialsState = {
  accessToken: localStorage.getItem(LocalStorageKey.ACCESS_TOKEN),
  refreshToken: localStorage.getItem(LocalStorageKey.REFRESH_TOKEN),
};

const authCredentialsSlice = createSlice({
  name: 'authCredentials',
  initialState,
  reducers: {
    setCredentials: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;

      localStorage.setItem(
        LocalStorageKey.ACCESS_TOKEN,
        action.payload.accessToken
      );
      localStorage.setItem(
        LocalStorageKey.REFRESH_TOKEN,
        action.payload.refreshToken
      );
    },
    clearCredentials: (state) => {
      state.accessToken = null;
      state.refreshToken = null;

      localStorage.removeItem(LocalStorageKey.ACCESS_TOKEN);
      localStorage.removeItem(LocalStorageKey.REFRESH_TOKEN);
    },
  },
});

export const { setCredentials, clearCredentials } =
  authCredentialsSlice.actions;

export default authCredentialsSlice.reducer;
