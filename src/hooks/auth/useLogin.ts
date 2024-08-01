import { ABORT_ERROR } from '../../constants/api.constants';
import { LoginRequest } from '../../types/auth/login-request.type';
import { LoginResponse } from '../../types/auth/login-response.type';
import { authService } from '../../services/auth.service';
import { useState } from 'react';

type LoginResult = {
  isLoading: boolean;
  error: string | null;
  login: (loginPaylaod: LoginRequest) => Promise<LoginResponse | undefined>;
};

export const useLogin = (): LoginResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (
    loginPayload: LoginRequest
  ): Promise<LoginResponse | undefined> => {
    const abortController = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      const loginResponse = await authService.login(
        loginPayload,
        abortController.signal
      );
      return loginResponse;
    } catch (err) {
      if ((err as Error).name !== ABORT_ERROR) {
        setError((err as Error).message);
      }
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, login };
};
