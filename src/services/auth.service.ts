import { BaseService } from './base.service';
import { CancelTokenSource } from 'axios';
import { HttpMethod } from '../enums/http-method.enum';
import { LoginRequest } from '../types/auth/login-request.type';
import { LoginResponse } from '../types/auth/login-response.type';
import { RegistrationRequest } from '../types/auth/registration-request.type';
import { RegistrationResponse } from '../types/auth/registration-response.type';

class AuthService extends BaseService {
  private readonly AUTH_FEATURE_URL_PREFIX = '/auth';

  public register(
    registrationPayload: RegistrationRequest,
    cancelToken: CancelTokenSource
  ): Promise<RegistrationResponse | undefined> {
    return this.request<RegistrationResponse>(
      HttpMethod.POST,
      `${this.AUTH_FEATURE_URL_PREFIX}/register`,
      registrationPayload,
      cancelToken
    );
  }

  public login(
    loginPayload: LoginRequest,
    cancelToken: CancelTokenSource
  ): Promise<LoginResponse | undefined> {
    return this.request<LoginResponse>(
      HttpMethod.POST,
      `${this.AUTH_FEATURE_URL_PREFIX}/login`,
      loginPayload,
      cancelToken
    );
  }
}

export const authService = new AuthService();
