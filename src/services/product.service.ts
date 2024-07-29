import axios, { AxiosResponse, CancelTokenSource } from 'axios';

import { ERROR_REQUEST_CANCELLED_BY_CLIENT } from '../constants/api.constants';
import { IProduct } from '../interfaces/product.interface';
import axiosInstance from '../api/axios-instance';
import { handleApiError } from '../utils/request.utils';
import log from '../utils/log.utils';

class ProductService {
  private readonly PRODUCTS_FEATURE_URL_PREFIX = '/products';
  public async getAllProducts(
    cancelToken: CancelTokenSource
  ): Promise<IProduct[] | undefined> {
    try {
      const response: AxiosResponse<IProduct[]> = await axiosInstance.get<
        IProduct[]
      >(this.PRODUCTS_FEATURE_URL_PREFIX, {
        cancelToken: cancelToken.token,
      });
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        log.debug(ERROR_REQUEST_CANCELLED_BY_CLIENT);
      } else {
        handleApiError(error);
      }
    }
  }

  public async getProductById(
    productId: string,
    cancelToken: CancelTokenSource
  ): Promise<IProduct | undefined> {
    try {
      const response: AxiosResponse<IProduct> =
        await axiosInstance.get<IProduct>(
          `${this.PRODUCTS_FEATURE_URL_PREFIX}/${productId}`,
          {
            cancelToken: cancelToken.token,
          }
        );
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        log.debug(ERROR_REQUEST_CANCELLED_BY_CLIENT);
      } else {
        handleApiError(error);
      }
    }
  }

  public async deleteProductById(
    productId: string,
    cancelToken: CancelTokenSource
  ): Promise<IProduct | undefined> {
    try {
      const response: AxiosResponse<IProduct> =
        await axiosInstance.delete<IProduct>(
          `${this.PRODUCTS_FEATURE_URL_PREFIX}/${productId}`,
          {
            cancelToken: cancelToken.token,
          }
        );
      return response.data;
    } catch (error) {
      if (axios.isCancel(error)) {
        log.debug(ERROR_REQUEST_CANCELLED_BY_CLIENT);
      } else {
        handleApiError(error);
      }
    }
  }
}

export const productService = new ProductService();
