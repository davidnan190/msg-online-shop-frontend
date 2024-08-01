import { BaseService } from './base.service';
import { CancelTokenSource } from 'axios';
import { HttpMethod } from '../enums/http-method.enum';
import { ILocation } from '../types/locations/location.interface';

class LocationService extends BaseService {
  private readonly LOCATION_FEATURE_URL_PREFIX = '/locations';

  public getAllLocations(
    cancelToken: CancelTokenSource
  ): Promise<ILocation[] | undefined> {
    return this.request<ILocation[]>(
      HttpMethod.GET,
      this.LOCATION_FEATURE_URL_PREFIX,
      undefined,
      cancelToken
    );
  }
}

export const locationService = new LocationService();