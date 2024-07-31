import { BaseService } from './base.service';
import { CancelTokenSource } from 'axios';
import { CreateProductRequest } from '../types/products/create-product-request.type';
import { HttpMethod } from '../enums/http-method.enum';
import { IProduct } from '../types/products/product.interface';
import { UpdateProductRequest } from '../types/products/update-product-request.type';

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

  public createProduct(
    newProductData: CreateProductRequest,
    cancelToken: CancelTokenSource
  ): Promise<IProduct | undefined> {
    return this.request<IProduct>(
      HttpMethod.POST,
      `${this.PRODUCTS_FEATURE_URL_PREFIX}`,
      newProductData,
      cancelToken
    );
  }

  public updateProductById(
    updatedData: UpdateProductRequest,
    cancelToken: CancelTokenSource
  ): Promise<IProduct | undefined> {
    return this.request<IProduct>(
      HttpMethod.PATCH,
      `${this.PRODUCTS_FEATURE_URL_PREFIX}/${updatedData.id}`,
      updatedData,
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
