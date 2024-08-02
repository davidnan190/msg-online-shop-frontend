import { z } from 'zod';

export const registrationSchema = z
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

export type RegistrationSchema = z.infer<typeof registrationSchema>;
