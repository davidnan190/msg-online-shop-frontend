import './LoginForm.scss';

import { LocalStorageKey } from '../../../enums/local-storage-key.enum';
import { LoginRequest } from '../../../types/auth/login-request.type';
import { LoginResponse } from '../../../types/auth/login-response.type';
import React from 'react';
import { access } from 'fs';
import { useAuthContext } from '../../../context/AuthContext';
import { useForm } from 'react-hook-form';
import { useLogin } from '../../../hooks/auth/useLogin';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const loginSchema = z.object({
  emailAddress: z
    .string()
    .min(3, 'Email is required')
    .email('Entered email is invalid.'),
  password: z.string().min(3, 'Password is required'),
});

const LoginForm: React.FC = () => {
  const { register, handleSubmit, formState } = useForm<LoginRequest>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const { login: authLogin, accessToken } = useAuthContext();
  const { login, isLoading, error } = useLogin();

  const handleLogin = async (credentials: LoginRequest) => {
    const response = await login(credentials);
    console.log(response);
    if (response) {
      authLogin(
        response.tokens.accessToken,
        response.tokens.refreshToken,
        response.customer.role
      );
    }

    console.log(accessToken);
  };

  return (
    <form
      onSubmit={handleSubmit(handleLogin)}
      className="login-form"
      noValidate
    >
      <div className="form-group">
        <label htmlFor="emailAddress" className="form-label">
          Email Address
        </label>
        <div className="input-group">
          <input
            type="email"
            {...register('emailAddress')}
            name="emailAddress"
            autoComplete="on"
            className="form-control"
            id="emailAddress"
            placeholder="Email Address"
            required
          />
          {formState.errors.emailAddress && (
            <div className="invalid-feedback">
              {formState.errors.emailAddress.message}
            </div>
          )}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="password" className="form-label">
          Password
        </label>
        <div className="input-group">
          <input
            type="password"
            {...register('password')}
            name="password"
            autoComplete="on"
            className="form-control"
            id="password"
            placeholder="Password"
            required
          />
          {formState.errors.password && (
            <div className="invalid-feedback">
              {formState.errors.password.message}
            </div>
          )}
        </div>
      </div>
      <div className="form-group">
        <button
          type="submit"
          disabled={formState.isSubmitting || isLoading}
          className="btn btn-primary"
        >
          {(formState.isSubmitting || isLoading) && (
            <span className="spinner-border" aria-hidden="true"></span>
          )}
          <span role="status">
            {formState.isSubmitting || isLoading ? 'Loading...' : 'Login'}
          </span>
        </button>
      </div>
    </form>
  );
};

export default LoginForm;