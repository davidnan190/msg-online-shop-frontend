import { ABORT_ERROR } from '../../constants/api.constants';
import { CreateProductRequest } from '../../types/products/create-product-request.type';
import { IProduct } from '../../types/products/product.interface';
import { productService } from '../../services/product.service';
import { useAuthContext } from '../../context/AuthContext';
import { useState } from 'react';

type CreateProductResult = {
  isLoading: boolean;
  error: string | null;
  createProduct: (
    newProductData: CreateProductRequest
  ) => Promise<IProduct | undefined>;
};

export const useCreateProduct = (): CreateProductResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const { accessToken } = useAuthContext();

  const createProduct = async (
    newProductData: CreateProductRequest
  ): Promise<IProduct | undefined> => {
    const abortController = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      if (!accessToken) {
        throw new Error('You dont have access this resource.');
      }
      const createdProduct = await productService.createProduct(
        newProductData,
        abortController.signal,
        accessToken
      );
      return createdProduct;
    } catch (err) {
      if ((err as Error).name !== ABORT_ERROR) {
        setError((err as Error).message);
      }
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, createProduct };
};
