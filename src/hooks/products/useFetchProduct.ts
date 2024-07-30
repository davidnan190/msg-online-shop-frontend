import axios, { CancelTokenSource } from 'axios';
import { useEffect, useState } from 'react';

import { ERROR_REQUEST_CANCELLED_BY_CLIENT } from '../../constants/api.constants';
import { IProduct } from '../../types/products/product.interface';
import { productService } from '../../services/product.service';

type FetchResult = {
  product: IProduct | undefined;
  isLoading: boolean;
  error: string | null;
}

const useFetchProduct = (productId: string): FetchResult => {
  const [product, setProduct] = useState<IProduct | undefined>(undefined);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();

    const fetchProductById = async (
      id: string,
      cancelToken: CancelTokenSource
    ) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await productService.getProductById(id, cancelToken);
        setProduct(data);
      } catch (err) {
        if (!axios.isCancel(err)) {
          setError((err as Error).message);
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchProductById(productId, cancelTokenSource);

    return () => {
      cancelTokenSource.cancel(ERROR_REQUEST_CANCELLED_BY_CLIENT);
    };
  }, [productId]);

  return { product, isLoading, error };
};

export default useFetchProduct;
