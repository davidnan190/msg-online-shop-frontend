import axios, { CancelTokenSource } from 'axios';

import { ERROR_REQUEST_CANCELLED_BY_CLIENT } from '../constants/api.constants';
import { ILocation } from '../interfaces/location.interface';
import axiosInstance from '../api/axios-instance';
import { handleApiError } from '../utils/request.utils';
import log from '../utils/log.utils';

class LocationService {
  private readonly LOCATION_FEATURE_URL_PREFIX = '/locations';

  public async getAllLocations(
    cancelToken: CancelTokenSource
  ): Promise<ILocation[] | undefined> {
    try {
      const response = await axiosInstance.get<ILocation[]>(
        this.LOCATION_FEATURE_URL_PREFIX,
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

export const locationService = new LocationService();
