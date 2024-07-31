import axios, { CancelTokenSource } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import { ERROR_REQUEST_CANCELLED_BY_CLIENT } from '../../constants/api.constants';
import { IProductCategory } from '../../types/products/product-category.interface';
import { productCategoryService } from '../../services/product-category.service';
import { useLogger } from '../../context/LoggerContext';

type FetchResult = {
  categories: IProductCategory[] | undefined;
  isLoading: boolean;
  error: string | null;
};

export const useFetchProductCategories = (): FetchResult => {
  const [categories, setCategories] = useState<IProductCategory[] | undefined>(
    []
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const logger = useLogger();

  const fetchProductCategories = useCallback(
    async (cancelToken: CancelTokenSource) => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await productCategoryService.getAllCategories(cancelToken);
        setCategories(data);
        logger.debug(`Fetch Categories Data: ${data}`, {
          hook: 'useFetchProductCategories',
          action: 'fetchProductCategories',
        });
      } catch (err) {
        if (!axios.isCancel(err)) setError((err as Error).message);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    const cancelTokenSource = axios.CancelToken.source();
    fetchProductCategories(cancelTokenSource);

    return () => {
      cancelTokenSource.cancel(ERROR_REQUEST_CANCELLED_BY_CLIENT);
    };
  }, [fetchProductCategories]);

  return { categories, isLoading, error };
};
