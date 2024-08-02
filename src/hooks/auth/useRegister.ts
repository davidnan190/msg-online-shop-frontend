import { ABORT_ERROR } from '../../constants/api.constants';
import { RegistrationRequest } from '../../types/auth/registration-request.type';
import { RegistrationResponse } from '../../types/auth/registration-response.type';
import { authService } from '../../services/auth.service';
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
    const abortController = new AbortController();
    setIsLoading(true);
    setError(null);

    try {
      const registrationResponse = await authService.register(
        registrationPayload,
        abortController.signal
      );
      return registrationResponse;
    } catch (err) {
      if ((err as Error).name !== ABORT_ERROR) {
        setError((err as Error).message);
      }
      return undefined;
    } finally {
      setIsLoading(false);
    }
  };

  return { isLoading, error, register };
};
