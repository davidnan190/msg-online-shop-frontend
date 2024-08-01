import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  CancelTokenSource,
} from 'axios';

import { ERROR_REQUEST_CANCELLED_BY_CLIENT } from '../constants/api.constants';
import { HttpMethod } from '../enums/http-method.enum';
import axiosInstance from '../api/axios-instance';
import { handleApiError } from '../utils/request.utils';

export class BaseService {
  protected async request<T>(
    method: HttpMethod,
    url: string,
    data?: any,
    cancelToken?: CancelTokenSource
  ): Promise<T | undefined> {
    try {
      const config: AxiosRequestConfig = {
        cancelToken: cancelToken?.token,
      };

      let response: AxiosResponse<T>;
      switch (method) {
        case HttpMethod.GET:
          response = await axiosInstance.get<T>(url, config);
          break;
        case HttpMethod.POST:
          response = await axiosInstance.post<T>(url, data, config);
          break;
        case HttpMethod.PATCH:
          response = await axiosInstance.patch<T>(url, data, config);
          break;
        case HttpMethod.PUT:
          response = await axiosInstance.put<T>(url, data, config);
          break;
        case HttpMethod.DELETE:
          response = await axiosInstance.delete<T>(url, config);
          break;
        default:
          throw new Error(`Unsupported method: ${method}`);
      }
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        console.debug(ERROR_REQUEST_CANCELLED_BY_CLIENT);
      } else {
        handleApiError(error);
      }
    }
  }
}