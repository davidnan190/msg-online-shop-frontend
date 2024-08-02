import { BACKEND_BASE_URL, LOGIN_URL_PREFIX, REGISTRATION_URL_PREFIX } from '../constants/api.constants';

import { HttpMethod } from '../enums/http-method.enum';
import { LoginRequest } from '../types/auth/login-request.type';
import { LoginResponse } from '../types/auth/login-response.type';
import { RegistrationRequest } from '../types/auth/registration-request.type';
import { RegistrationResponse } from '../types/auth/registration-response.type';
import { fetchWithCancellation } from '../utils/request.utils';

class AuthService {
  private readonly AUTH_BASE_URL: string;
  constructor(baseUrl: string) {
    this.AUTH_BASE_URL = `${baseUrl}/auth`;
  }

  public async register(
    registrationPayload: RegistrationRequest,
    signal: AbortSignal
  ): Promise<RegistrationResponse | undefined> {
    const headers = {
      'Content-Type': 'application/json',
    };
    const url = `${this.AUTH_BASE_URL}${REGISTRATION_URL_PREFIX}`;
    return await fetchWithCancellation<RegistrationResponse>(
      url,
      {
        method: HttpMethod.POST,
        headers,
        body: JSON.stringify(registrationPayload),
      },
      signal
    );
  }

  public async login(
    loginPayload: LoginRequest,
    signal: AbortSignal
  ): Promise<LoginResponse | undefined> {
    const headers = {
      'Content-Type': 'application/json',
    };
    const url = `${this.AUTH_BASE_URL}${LOGIN_URL_PREFIX}`;
    return await fetchWithCancellation<LoginResponse>(
      url,
      {
        method: HttpMethod.POST,
        headers,
        body: JSON.stringify(loginPayload),
      },
      signal
    );
  }
}

export const authService = new AuthService(BACKEND_BASE_URL);
