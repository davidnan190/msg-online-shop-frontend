import { BACKEND_BASE_URL, LOGIN_URL_PREFIX, REGISTRATION_URL_PREFIX } from '../constants/api.constants';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
        url: REGISTRATION_URL_PREFIX,
        method: HttpMethod.POST,
        body: registrationPayload,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (loginPayload) => ({
        url: LOGIN_URL_PREFIX,
        method: HttpMethod.POST,
        body: loginPayload,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authAPI;
