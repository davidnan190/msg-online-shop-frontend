import { RegistrationRequest } from '../../types/auth/registration-request.type';
import { RegistrationResponse } from '../../types/auth/registration-response.type';
import { authService } from '../../services/auth.service';
import axios from 'axios';
import { useState } from 'react';

type RegisterResult = {
  isLoading: boolean;
  error: string | null;
  register: (
    registrationPayload: RegistrationRequest
  ) => Promise<RegistrationResponse | undefined>;
};

export const useRegister = (): RegisterResult => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (
    registrationPayload: RegistrationRequest
  ): Promise<RegistrationResponse | undefined> => {
    const cancelTokenSource = axios.CancelToken.source();
    setIsLoading(true);
    setError(null);

    try {
      const registrationResponse = await authService.register(
        registrationPayload,
        cancelTokenSource
      );
      return registrationResponse;
    } catch (err) {
      if (!axios.isCancel(err)) {
        setError((err as Error).message);
      }
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, register };
};
