import { createHeaders, fetchWithCancellation } from '../utils/request.utils';

import { BACKEND_BASE_URL } from '../constants/api.constants';
import { HttpMethod } from '../enums/http-method.enum';
import { IProductCategory } from '../types/products/product-category.interface';

class ProductCategoryService {
  private readonly CATEGORY_BASE_URL: string;

  constructor(baseUrl: string) {
    this.CATEGORY_BASE_URL = `${baseUrl}/categories`;
  }

  public async getAllCategories(
    signal: AbortSignal,
    accessToken?: string
  ): Promise<IProductCategory[] | undefined> {
    const headers = createHeaders(accessToken);
    const url = this.CATEGORY_BASE_URL;
    return await fetchWithCancellation<IProductCategory[]>(
      url,
      { method: HttpMethod.GET, headers },
      signal
    );
  }
}

export const productCategoryService = new ProductCategoryService(
  BACKEND_BASE_URL
);
