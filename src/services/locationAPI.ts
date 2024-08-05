import { LOCATIONS_CACHE_TAG, LOCATIONS_URL_PREFIX } from '../constants/api.constants';

import { ILocation } from '../types/locations/location.interface';
import { baseApi } from './baseApi';

export const locationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllLocations: builder.query<ILocation[], void>({
      query: () => LOCATIONS_URL_PREFIX,
      keepUnusedDataFor: 360,
      providesTags: [LOCATIONS_CACHE_TAG],
    }),
    getLocationById: builder.query<ILocation, string>({
      query: (locationId) => `${LOCATIONS_URL_PREFIX}/${locationId}`,
    }),
  }),
});

export const { useGetAllLocationsQuery, useGetLocationByIdQuery } = locationApi;
