import { CreateOrderRequest } from '../../types/orders/create-order-request.type';
import { IOrder } from '../../interfaces/order.interface';
import axios from 'axios';
import { orderService } from '../../services/order.service';
import { useState } from 'react';

type PlaceOrderResult = {
  isLoading: boolean;
  error: string | null;
  placeOrder: (orderData: CreateOrderRequest) => Promise<IOrder | undefined>;
};

const usePlaceOrder = (): PlaceOrderResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const placeOrder = async (
    orderData: CreateOrderRequest
  ): Promise<IOrder | undefined> => {
    const cancelTokenSource = axios.CancelToken.source();
    setIsLoading(true);
    setError(null);

    try {
      const createdOrder = await orderService.placeOrder(
        orderData,
        cancelTokenSource
      );
      return createdOrder;
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError((err as Error).message);
      }
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, placeOrder };
};

export default usePlaceOrder;
