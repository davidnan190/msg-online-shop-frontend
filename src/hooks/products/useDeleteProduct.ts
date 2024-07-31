import axios from 'axios';
import { productService } from '../../services/product.service';
import { useState } from 'react';

type DeleteResult = {
  isLoading: boolean;
  error: string | null;
  deleteProduct: (productId: string) => Promise<void>;
};

export const useDeleteProduct = (): DeleteResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const deleteProduct = async (productId: string) => {
    const cancelTokenSource = axios.CancelToken.source();

    setIsLoading(true);
    setError(null);

    try {
      await productService.deleteProductById(productId, cancelTokenSource);
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError((err as Error).message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, deleteProduct };
};
