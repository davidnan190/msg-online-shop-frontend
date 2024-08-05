import './LoginForm.scss';

import { LoginSchema, loginSchema } from '../../../types/schemas/login-schema';

import { LoginRequest } from '../../../types/auth/login-request.type';
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

type Props = {
  onLogin: (credentials: LoginRequest) => Promise<void>;
  isLoading: boolean;
};

const LoginForm: React.FC<Props> = ({ onLogin, isLoading }) => {
  const { register, handleSubmit, formState } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
    mode: 'onTouched',
  });

  const handleLogin = async (credentials: LoginSchema) => {
    try {
      await onLogin(credentials);
    } catch (error) {
      console.error('Login failed:', error);
    }
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
            disabled={isLoading}
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
            disabled={isLoading}
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
