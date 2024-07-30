import axios, { CancelTokenSource } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { ERROR_REQUEST_CANCELLED_BY_CLIENT } from '../../constants/api.constants';
import { IProduct } from '../../types/products/product.interface';
import { productService } from '../../services/product.service';
import { useLogger } from '../../context/LoggerContext';

type FetchResult = {
  products: IProduct[] | undefined;
  isLoading: boolean;
  error: string | null;
};

export const useFetchProducts = (): FetchResult => {
  const [products, setProducts] = useState<IProduct[] | undefined>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const logger = useLogger();

  const fetchProducts = useCallback(async (cancelToken: CancelTokenSource) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await productService.getAllProducts(cancelToken);
      setProducts(data);
      logger.debug(`Fetch Products Data: ${data}`, {
        hook: 'useFetchProducts',
        action: 'fetchProducts',
      });
    } catch (err) {
      if (!axios.isCancel(err)) setError((err as Error).message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    fetchProducts(cancelTokenSource);

    return () => {
      cancelTokenSource.cancel(ERROR_REQUEST_CANCELLED_BY_CLIENT);
    };
  }, [fetchProducts]);

  return { products, isLoading, error };
};
