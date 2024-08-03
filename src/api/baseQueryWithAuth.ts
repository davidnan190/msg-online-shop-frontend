import { BACKEND_BASE_URL } from '../constants/api.constants';
import { LocalStorageKey } from '../enums/local-storage-key.enum';
import { RootState } from '../store/store';
import { fetchBaseQuery } from '@reduxjs/toolkit/query';

export const baseQueryWithAuth = fetchBaseQuery({
  baseUrl: BACKEND_BASE_URL,
  // credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    const state = getState() as RootState;
    const accessToken =
      state.authCredentials.accessToken ||
      localStorage.getItem(LocalStorageKey.ACCESS_TOKEN);
    console.log(accessToken);

    if (accessToken) {
      headers.set('Authorization', `Bearer ${accessToken}`);
    }
    return headers;
  },
});
