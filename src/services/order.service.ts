import axios, { AxiosResponse, CancelTokenSource } from 'axios';

import { CreateOrderRequest } from '../types/orders/create-order-request.type';
import { ERROR_REQUEST_CANCELLED_BY_CLIENT } from '../constants/api.constants';
import { IOrder } from '../interfaces/order.interface';
import axiosInstance from '../api/axios-instance';
import { handleApiError } from '../utils/request.utils';
import log from '../utils/log.utils';

class OrderService {
  private readonly ORDERS_FEATURE_URL_PREFIX = '/orders';

  public async placeOrder(
    orderData: CreateOrderRequest,
    cancelToken: CancelTokenSource
  ): Promise<IOrder | undefined> {
    try {
      const response: AxiosResponse<IOrder | undefined> =
        await axiosInstance.post<IOrder>(
          this.ORDERS_FEATURE_URL_PREFIX,
          orderData,
          {
            cancelToken: cancelToken.token,
          }
        );
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        log.debug(ERROR_REQUEST_CANCELLED_BY_CLIENT);
      } else {
        handleApiError(error);
      }
    }
  }

  public async getOrdersByCustomerId(
    customerId: string,
    cancelToken: CancelTokenSource
  ): Promise<IOrder[] | undefined> {
    try {
      const response: AxiosResponse<IOrder[]> = await axiosInstance.get<
        IOrder[]
      >(`${this.ORDERS_FEATURE_URL_PREFIX}/customer/${customerId}`, {
        cancelToken: cancelToken.token,
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        log.debug(ERROR_REQUEST_CANCELLED_BY_CLIENT);
      } else {
        handleApiError(error);
      }
    }
  }
}

export const orderService = new OrderService();
