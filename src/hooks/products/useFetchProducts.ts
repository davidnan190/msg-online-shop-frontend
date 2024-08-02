import { useCallback, useEffect, useState } from 'react';

import { IProduct } from '../../types/products/product.interface';
import { productService } from '../../services/product.service';
import { useAuthContext } from '../../context/AuthContext';
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
  const { accessToken } = useAuthContext();

  const fetchProducts = useCallback(
    async (signal: AbortSignal) => {
      setIsLoading(true);
      setError(null);

      try {
        if (!accessToken) {
          throw new Error('No access token available');
        }
        const data = await productService.getAllProducts(signal, accessToken);
        setProducts(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    [accessToken, logger]
  );

  useEffect(() => {
    const abortController = new AbortController();

    fetchProducts(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [fetchProducts]);

  return { products, isLoading, error };
};
