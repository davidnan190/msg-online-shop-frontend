import { BaseService } from './base.service';
import { CancelTokenSource } from 'axios';
import { HttpMethod } from '../enums/http-method.enum';
import { IProduct } from '../types/products/product.interface';

class ProductService extends BaseService {
  private readonly PRODUCTS_FEATURE_URL_PREFIX = '/products';

  public getAllProducts(
    cancelToken: CancelTokenSource
  ): Promise<IProduct[] | undefined> {
    return this.request<IProduct[]>(
      HttpMethod.GET,
      this.PRODUCTS_FEATURE_URL_PREFIX,
      undefined,
      cancelToken
    );
  }

  public getProductById(
    productId: string,
    cancelToken: CancelTokenSource
  ): Promise<IProduct | undefined> {
    return this.request<IProduct>(
      HttpMethod.GET,
      `${this.PRODUCTS_FEATURE_URL_PREFIX}/${productId}`,
      undefined,
      cancelToken
    );
  }

  public deleteProductById(
    productId: string,
    cancelToken: CancelTokenSource
  ): Promise<IProduct | undefined> {
    return this.request<IProduct>(
      HttpMethod.DELETE,
      `${this.PRODUCTS_FEATURE_URL_PREFIX}/${productId}`,
      undefined,
      cancelToken
    );
  }
}

export const productService = new ProductService();
