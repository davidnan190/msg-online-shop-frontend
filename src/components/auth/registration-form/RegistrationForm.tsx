import './RegistrationForm.scss';

import React from 'react';
import { RegistrationRequest } from '../../../types/auth/registration-request.type';
import { RegistrationResponse } from '../../../types/auth/registration-response.type';
import { Role } from '../../../enums/role.enum';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

const registrationSchema = z
  .object({
    firstName: z.string().min(3, 'First name is required'),
    lastName: z.string().min(3, 'Last name is required'),
    username: z.string().min(3, 'Username is required'),
    emailAddress: z
      .string()
      .min(3, 'Email address is required')
      .email('Invalid email address'),
    password: z.string().min(1, 'Password is required'),
    confirmPassword: z.string().min(1, 'Password confirmation is required.'),
  })
  .refine((formData) => formData.password === formData.confirmPassword, {
    message: "Passwords don't match. Please check again.",
    path: ['confirmPassword'],
  });


type Props = {
  onRegister: (
    credentials: RegistrationRequest
  ) => Promise<RegistrationResponse | undefined>;
  isLoading: boolean;
};

const RegistrationForm: React.FC<Props> = ({ onRegister, isLoading }) => {
  const { register, handleSubmit, formState, reset } = useForm<RegistrationRequest>({
    resolver: zodResolver(registrationSchema),
    mode: 'onTouched',
  });

  const handleRegistration = async (credentials: RegistrationRequest) => {
    console.log('Submitted credentials:', credentials);
    try {
      const result = await onRegister({...credentials, role: Role.ADMIN});
      if (result) {
        alert(result.message);
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
    reset();
  };

  return (
    <form
      onSubmit={handleSubmit(handleRegistration)}
      className="registration-form"
      noValidate
    >
      <div className="form-group">
        <label htmlFor="firstName" className="form-label">
          First name
        </label>
        <div className="input-group">
          <input
            type="text"
            {...register('firstName')}
            name="firstName"
            className="form-control"
            id="firstName"
            placeholder="First name"
            disabled={isLoading}
            required
          />
          {formState.errors.firstName && (
            <div className="invalid-feedback">
              {formState.errors.firstName.message}
            </div>
          )}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="lastName" className="form-label">
          Last name
        </label>
        <div className="input-group">
          <input
            type="text"
            {...register('lastName')}
            name="lastName"
            className="form-control"
            id="lastName"
            placeholder="Last Name"
            disabled={isLoading}
            required
          />
          {formState.errors.lastName && (
            <div className="invalid-feedback">
              {formState.errors.lastName.message}
            </div>
          )}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="username" className="form-label">
          Username
        </label>
        <div className="input-group">
          <input
            type="text"
            {...register('username')}
            name="username"
            className="form-control"
            id="username"
            placeholder="Username"
            disabled={isLoading}
            required
          />
          {formState.errors.username && (
            <div className="invalid-feedback">
              {formState.errors.username.message}
            </div>
          )}
        </div>
      </div>
      <div className="form-group">
        <label htmlFor="emailAddress" className="form-label">
          Email Address
        </label>
        <div className="input-group">
          <input
            type="email"
            {...register('emailAddress')}
            name="emailAddress"
            className="form-control"
            id="emailAddress"
            placeholder="Email address"
            disabled={isLoading}
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
            className="form-control"
            id="password"
            placeholder="Password"
            disabled={isLoading}
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
        <label htmlFor="confirmPassword" className="form-label">
          Confirm Password
        </label>
        <div className="input-group">
          <input
            type="password"
            {...register('confirmPassword')}
            name="confirmPassword"
            className="form-control"
            id="confirmPassword"
            placeholder="Confirm password"
            disabled={isLoading}
            required
          />
          {formState.errors.confirmPassword && (
            <div className="invalid-feedback">
              {formState.errors.confirmPassword.message}
            </div>
          )}
        </div>
      </div>
      <hr className="my-4" />
      <div className="d-grid gap-2 col-6 mx-auto">
        <button
          className="btn btn-primary"
          type="submit"
          disabled={formState.isSubmitting || isLoading}
        >
          <span>
            {formState.isSubmitting || isLoading ? 'Loading...' : 'Register'}
          </span>
        </button>
      </div>
    </form>
  );
};

export default RegistrationForm;
