import { BaseService } from './base.service';
import { CancelTokenSource } from 'axios';
import { CreateOrderRequest } from '../types/orders/create-order-request.type';
import { HttpMethod } from '../enums/http-method.enum';
import { IOrder } from '../types/orders/order.interface';

class OrderService extends BaseService {
  private readonly ORDERS_FEATURE_URL_PREFIX = '/orders';

  public placeOrder(
    orderData: CreateOrderRequest,
    cancelToken: CancelTokenSource
  ): Promise<IOrder | undefined> {
    return this.request<IOrder>(
      HttpMethod.POST,
      this.ORDERS_FEATURE_URL_PREFIX,
      orderData,
      cancelToken
    );
  }

  public getOrdersByCustomerId(
    customerId: string,
    cancelToken: CancelTokenSource
  ): Promise<IOrder[] | undefined> {
    return this.request<IOrder[]>(
      HttpMethod.GET,
      `${this.ORDERS_FEATURE_URL_PREFIX}/customer/${customerId}`,
      undefined,
      cancelToken
    );
  }
}

export const orderService = new OrderService();
