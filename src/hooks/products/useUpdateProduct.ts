import { IProduct } from '../../types/products/product.interface';
import { UpdateProductRequest } from '../../types/products/update-product-request.type';
import { productService } from '../../services/product.service';
import { useAuthContext } from '../../context/AuthContext';
import { useState } from 'react';

type UpdateResult = {
  isLoading: boolean;
  error: string | null;
  updateProduct: (
    updatedData: UpdateProductRequest
  ) => Promise<IProduct | undefined>;
};

export const useUpdateProduct = (): UpdateResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { accessToken } = useAuthContext();

  const updateProduct = async (
    updatedData: UpdateProductRequest
  ): Promise<IProduct | undefined> => {
    const abortController = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      if (!accessToken) {
        throw new Error('No access token available');
      }
      const updatedProduct = await productService.updateProductById(
        updatedData,
        abortController.signal,
        accessToken
      );
      return updatedProduct;
    } catch (err) {
      setError((err as Error).message);
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, updateProduct };
};
