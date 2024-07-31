import { CreateProductRequest } from "../../types/products/create-product-request.type";
import { IProduct } from "../../types/products/product.interface";
import axios from "axios";
import { productService } from "../../services/product.service";
import { useState } from "react";

type CreateProductResult = {
  isLoading: boolean;
  error: string | null;
  createProduct: (newProductData: CreateProductRequest) => Promise<IProduct | undefined>;
};

export const useCreateProduct = (): CreateProductResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const createProduct = async (
    newProductData: CreateProductRequest
  ): Promise<IProduct | undefined> => {
    const cancelTokenSource = axios.CancelToken.source();
    setIsLoading(true);
    setError(null);

    try {
      const createdProduct = await productService.createProduct(
        newProductData,
        cancelTokenSource
      );
      return createdProduct;
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError((err as Error).message);
      }
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, createProduct };
};
