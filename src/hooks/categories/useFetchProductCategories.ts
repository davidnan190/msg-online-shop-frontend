import { useCallback, useEffect, useState } from 'react';

import { IProductCategory } from '../../types/products/product-category.interface';
import { productCategoryService } from '../../services/product-category.service';
import { useAuthContext } from '../../context/AuthContext';
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
  const { accessToken } = useAuthContext();

  const fetchCategories = useCallback(
    async (signal: AbortSignal) => {
      setIsLoading(true);
      setError(null);

      try {
        if (!accessToken) {
          throw new Error('No access token available');
        }
        const data = await productCategoryService.getAllCategories(
          signal,
          accessToken
        );
        setCategories(data);
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

    fetchCategories(abortController.signal);

    return () => {
      abortController.abort();
    };
  }, [fetchCategories]);

  return { categories, isLoading, error };
};
