import { BaseService } from './base.service';
import { CancelTokenSource } from 'axios';
import { HttpMethod } from '../enums/http-method.enum';
import { IProductCategory } from '../types/products/product-category.interface';

class ProductCategoryService extends BaseService {
  private readonly CATEGORY_FEATURE_URL_PREFIX = '/categories';

  public getAllCategories(
    cancelToken: CancelTokenSource
  ): Promise<IProductCategory[] | undefined> {
    return this.request<IProductCategory[]>(
      HttpMethod.GET,
      this.CATEGORY_FEATURE_URL_PREFIX,
      undefined,
      cancelToken
    );
  }
}

export const productCategoryService = new ProductCategoryService();
