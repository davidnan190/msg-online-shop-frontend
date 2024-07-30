import {
  ABORT_ERROR,
  ERROR_REQUEST_CANCELLED_BY_CLIENT,
} from '../../constants/api.constants';
import { useEffect, useState } from 'react';

import { ICustomer } from '../../types/customers/customer.interface';
import { customerService } from '../../services/customer.service';

type FetchResult = {
  customer: ICustomer | undefined;
  isLoading: boolean;
  error: string | null;
};

export const useFetchCustomer = (productId: string): FetchResult => {
  const [customer, setCustomer] = useState<ICustomer | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCustomerById = async (
      customerId: string,
      signal: AbortSignal
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await customerService.getCustomerById(customerId, signal);
        setCustomer(data);
      } catch (err) {
        if ((err as Error).name !== ABORT_ERROR) {
          setError((err as Error).message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCustomerById(productId, controller.signal);

    return () => {
      controller.abort(ERROR_REQUEST_CANCELLED_BY_CLIENT);
    };
  }, [productId]);

  return { customer, isLoading, error };
};
