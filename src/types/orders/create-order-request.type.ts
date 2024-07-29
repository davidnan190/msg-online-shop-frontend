import { DesiredOrderItem } from './desired-order-item.type';
import { IOrder } from '../../interfaces/order.interface';

export type CreateOrderRequest = Omit<
  IOrder,
  'id' | 'createdAt' | 'orderDetails'
> & {
  desiredOrderItems: DesiredOrderItem[];
};
