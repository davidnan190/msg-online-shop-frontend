import {
  AUTH_URL_PREFIX,
  LOGIN_URL_PREFIX,
  REGISTRATION_URL_PREFIX,
} from '../constants/api.constants';

import { HttpMethod } from '../enums/http-method.enum';
import { LoginRequest } from '../types/auth/login-request.type';
import { LoginResponse } from '../types/auth/login-response.type';
import { RegistrationRequest } from '../types/auth/registration-request.type';
import { RegistrationResponse } from '../types/auth/registration-response.type';
import { baseApi } from './baseApi';

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, RegistrationRequest>({
      query: (registrationPayload) => ({
        url: `${AUTH_URL_PREFIX}${REGISTRATION_URL_PREFIX}`,
        method: HttpMethod.POST,
        body: registrationPayload,
      }),
    }),
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (loginPayload) => ({
        url: `${AUTH_URL_PREFIX}${LOGIN_URL_PREFIX}`,
        method: HttpMethod.POST,
        body: loginPayload,
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation } = authApi;
