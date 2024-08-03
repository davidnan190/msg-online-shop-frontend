import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { ILocation } from '../types/locations/location.interface';
import { baseQueryWithAuth } from './baseQueryWithAuth';

export const locationAPI = createApi({
  reducerPath: 'locationAPI',
  baseQuery: baseQueryWithAuth,
  tagTypes: ['Locations'],
  endpoints: (builder) => ({
    getAllLocations: builder.query<ILocation[], void>({
      query: () => '/locations',
      keepUnusedDataFor: 360,
      providesTags: () => ['Locations'],
    }),
    getLocationById: builder.query<ILocation[], string>({
      query: (locationId) => `/locations/${locationId}`,
    }),
  }),
});

export const { useGetAllLocationsQuery, useGetLocationByIdQuery } = locationAPI;
