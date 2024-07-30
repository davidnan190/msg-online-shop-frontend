import {
  ABORT_ERROR,
  BACKEND_BASE_URL,
  ERROR_REQUEST_CANCELLED_BY_CLIENT,
} from '../constants/api.constants';

import { HttpMethod } from '../enums/http-method.enum';
import { ICustomer } from '../types/customers/customer.interface';
import { handleApiError } from '../utils/request.utils';

class CustomerService {
  private readonly CUSTOMERS_FEATURE_BASE_URL = `${BACKEND_BASE_URL}/customers`;

  public async getAllCustomers(
    signal: AbortSignal
  ): Promise<ICustomer[] | undefined> {
    return await this.fetchWithCancellation(
      this.CUSTOMERS_FEATURE_BASE_URL,
      { method: HttpMethod.GET },
      signal
    );
  }

  public async getCustomerById(
    productId: string,
    signal: AbortSignal
  ): Promise<ICustomer | undefined> {
    return await this.fetchWithCancellation(
      `${this.CUSTOMERS_FEATURE_BASE_URL}/${productId}`,
      { method: HttpMethod.GET },
      signal
    );
  }

  private async fetchWithCancellation(
    url: string,
    options: RequestInit,
    signal: AbortSignal
  ): Promise<any> {
    try {
      const response = await fetch(url, { ...options, signal });
      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }
      return await response.json();
    } catch (error) {
      if ((error as Error).name === ABORT_ERROR) {
        console.debug(ERROR_REQUEST_CANCELLED_BY_CLIENT)
      } else {
        handleApiError(error);
      }
    }
  }
}

export const customerService = new CustomerService();
