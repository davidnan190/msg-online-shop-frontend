import { DesiredOrderItem } from './desired-order-item.type';
import { IOrder } from './order.interface';

export type CreateOrderRequest = Omit<
  IOrder,
  'id' | 'createdAt' | 'orderDetails'
> & {
  desiredOrderItems: DesiredOrderItem[];
};
