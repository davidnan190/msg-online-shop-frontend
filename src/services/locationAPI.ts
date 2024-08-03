import { LOCATIONS_CACHING_TAG, LOCATIONS_URL_PREFIX } from '../constants/api.constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ILocation } from '../types/locations/location.interface';
import { baseQueryWithAuth } from './baseQueryWithAuth';

export const locationAPI = createApi({
  reducerPath: 'locationAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: [LOCATIONS_CACHING_TAG],
  endpoints: (builder) => ({
    getAllLocations: builder.query<ILocation[], void>({
      query: () => LOCATIONS_URL_PREFIX,
      keepUnusedDataFor: 360,
      providesTags: () => [LOCATIONS_CACHING_TAG],
    }),
    getLocationById: builder.query<ILocation[], string>({
      query: (locationId) => `${LOCATIONS_URL_PREFIX}/${locationId}`,
    }),
  }),
});

export const { useGetAllLocationsQuery, useGetLocationByIdQuery } = locationAPI;
