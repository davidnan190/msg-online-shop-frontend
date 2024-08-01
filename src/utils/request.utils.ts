import {
  ABORT_ERROR,
  ERROR_REQUEST_CANCELLED_BY_CLIENT,
} from '../constants/api.constants';

export const handleApiError = (error: any): void => {
  console.error('API call failed:', error);
  throw error;
};

interface IFetchOptions extends RequestInit {
  headers?: Record<string, string>;
}

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
    headers['Authorization'] = `Bearer ${accessToken}`;
  }
  return headers;
}
