import { ABORT_ERROR, ERROR_REQUEST_CANCELLED_BY_CLIENT } from '../../constants/api.constants';
import axios, { CancelTokenSource } from 'axios';
import { useEffect, useState } from 'react';

import { IProduct } from '../../types/products/product.interface';
import { productService } from '../../services/product.service';
import { useAuthContext } from '../../context/AuthContext';

type FetchResult = {
  product: IProduct | undefined;
  isLoading: boolean;
  error: string | null;
};

export const useFetchProduct = (productId: string): FetchResult => {
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { accessToken } = useAuthContext();

  useEffect(() => {
    const abortController = new AbortController();

    const fetchProductById = async (id: string, signal: AbortSignal) => {
      setIsLoading(true);
      setError(null);

      try {
        if (!accessToken) {
          throw new Error('No access token available');
        }
        const data = await productService.getProductById(
          id,
          signal,
          accessToken
        );
        setProduct(data);
      } catch (err) {
        if ((err as Error).name !== ABORT_ERROR) {
          setError((err as Error).message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductById(productId, abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [productId, accessToken]);

  return { product, isLoading, error };
};
