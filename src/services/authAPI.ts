import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { BACKEND_BASE_URL } from '../constants/api.constants';
import { HttpMethod } from '../enums/http-method.enum';
import { LoginRequest } from '../types/auth/login-request.type';
import { LoginResponse } from '../types/auth/login-response.type';
import { RegistrationRequest } from '../types/auth/registration-request.type';
import { RegistrationResponse } from '../types/auth/registration-response.type';

export const authAPI = createApi({
  reducerPath: 'authAPI',
  baseQuery: fetchBaseQuery({ baseUrl: `${BACKEND_BASE_URL}/auth` }),
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationRequest>({
      query: (registrationPayload) => ({
        url: '/register',
        method: HttpMethod.POST,
        body: registrationPayload,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (loginPayload) => ({
        url: '/login',
        method: HttpMethod.POST,
        body: loginPayload,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authAPI;
