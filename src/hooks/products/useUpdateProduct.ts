import { IProduct } from '../../interfaces/product.interface';
import { UpdateProductRequest } from '../../types/products/update-product-request.type';
import axios from 'axios';
import { productService } from '../../services/product.service';
import { useState } from 'react';

type UpdateResult = {
  isLoading: boolean;
  error: string | null;
  updateProduct: (
    updatedData: UpdateProductRequest
  ) => Promise<IProduct | undefined>;
};

const useUpdateProduct = (): UpdateResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const updateProduct = async (
    updatedData: UpdateProductRequest
  ): Promise<IProduct | undefined> => {
    const cancelTokenSource = axios.CancelToken.source();
    setIsLoading(true);
    setError(null);

    try {
      const updatedProduct = await productService.updateProductById(
        updatedData,
        cancelTokenSource
      );
      return updatedProduct;
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError((err as Error).message);
      }
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, updateProduct };
};

export default useUpdateProduct;
