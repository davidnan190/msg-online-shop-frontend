import {
  ABORT_ERROR,
  ERROR_REQUEST_CANCELLED_BY_CLIENT,
} from '../constants/api.constants';
import {
  AUTHORIZATION_HEADER,
  BEARER_TOKEN_PREFIX,
} from '../constants/auth.constants';

import { IFetchOptions } from '../types/requests/fetch-options.interface';
import axiosInstance from '../api/axios-instance';

export const handleApiError = (error: any): void => {
  console.error('API call failed:', error);
  throw error;
};

export async function fetchWithCancellation<T>(
  url: string,
  options: IFetchOptions,
  signal: AbortSignal
): Promise<T | undefined> {
  try {
    const response = await fetch(url, { ...options, signal });
    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }
    return (await response.json()) as T;
  } catch (error) {
    if ((error as Error).name === ABORT_ERROR) {
      console.debug(ERROR_REQUEST_CANCELLED_BY_CLIENT);
    } else {
      handleApiError(error);
    }
  }
}

export const createHeaders = (accessToken?: string): Record<string, string> => {
  const headers: Record<string, string> = {};
  if (accessToken) {
    headers[AUTHORIZATION_HEADER] = `${BEARER_TOKEN_PREFIX}${accessToken}`;
  }
  return headers;
};

export const setAxiosAccessToken = (accessToken: string) => {
  axiosInstance.defaults.headers.common[
    AUTHORIZATION_HEADER
  ] = `${BEARER_TOKEN_PREFIX}${accessToken}`;
};

export const clearAxiosAccessToken = () => {
  axiosInstance.defaults.headers.common[AUTHORIZATION_HEADER] = null;
};
