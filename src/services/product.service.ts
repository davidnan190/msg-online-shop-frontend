import { createHeaders, fetchWithCancellation } from '../utils/request.utils';

import { BACKEND_BASE_URL } from '../constants/api.constants';
import { CreateProductRequest } from '../types/products/create-product-request.type';
import { HttpMethod } from '../enums/http-method.enum';
import { IProduct } from '../types/products/product.interface';
import { UpdateProductRequest } from '../types/products/update-product-request.type';

class ProductService {
  private readonly PRODUCTS_BASE_URL: string;

  constructor(baseUrl: string) {
    this.PRODUCTS_BASE_URL = `${baseUrl}/products`;
  }

  public async getAllProducts(
    signal: AbortSignal,
    accessToken?: string
  ): Promise<IProduct[] | undefined> {
    const headers = createHeaders(accessToken);
    const url = this.PRODUCTS_BASE_URL;
    return await fetchWithCancellation<IProduct[]>(
      url,
      { method: HttpMethod.GET, headers },
      signal
    );
  }

  public async getProductById(
    productId: string,
    signal: AbortSignal,
    accessToken?: string
  ): Promise<IProduct | undefined> {
    const headers = createHeaders(accessToken);
    const url = `${this.PRODUCTS_BASE_URL}/${productId}`;
    return await fetchWithCancellation<IProduct>(
      url,
      { method: HttpMethod.GET, headers },
      signal
    );
  }

  public async updateProductById(
    updatedData: UpdateProductRequest,
    signal: AbortSignal,
    accessToken?: string
  ): Promise<IProduct | undefined> {
    const headers = {
      ...createHeaders(accessToken),
      'Content-Type': 'application/json',
    };
    const url = `${this.PRODUCTS_BASE_URL}/${updatedData.id}`;
    return await fetchWithCancellation<IProduct>(
      url,
      {
        method: HttpMethod.PATCH,
        headers,
        body: JSON.stringify(updatedData),
      },
      signal
    );
  }

  public async createProduct(
    newProductData: CreateProductRequest,
    signal: AbortSignal,
    accessToken?: string
  ): Promise<IProduct | undefined> {
    const headers = {
      ...createHeaders(accessToken),
      'Content-Type': 'application/json',
    };
    const url = this.PRODUCTS_BASE_URL;
    return await fetchWithCancellation<IProduct>(
      url,
      {
        method: HttpMethod.POST,
        headers,
        body: JSON.stringify(newProductData),
      },
      signal
    );
  }

  public async deleteProductById(
    productId: string,
    signal: AbortSignal,
    accessToken?: string
  ): Promise<void> {
    const headers = createHeaders(accessToken);
    const url = `${this.PRODUCTS_BASE_URL}/${productId}`;
    await fetchWithCancellation<void>(
      url,
      { method: HttpMethod.DELETE, headers },
      signal
    );
  }
}

export const productService = new ProductService(BACKEND_BASE_URL);
