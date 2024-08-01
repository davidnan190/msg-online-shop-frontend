import { productService } from '../../services/product.service';
import { useAuthContext } from '../../context/AuthContext';
import { useState } from 'react';

type DeleteResult = {
  isLoading: boolean;
  error: string | null;
  deleteProduct: (productId: string) => Promise<void>;
};

export const useDeleteProduct = (): DeleteResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { accessToken } = useAuthContext();

  const deleteProduct = async (productId: string) => {
    const abortController = new AbortController();

    setIsLoading(true);
    setError(null);

    try {
      if (!accessToken) {
        throw new Error('No access token available');
      }
      await productService.deleteProductById(productId, abortController.signal, accessToken);
    } catch (err) {
      if ((err as Error).name !== 'AbortError') {
        setError((err as Error).message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, deleteProduct };
};
