import { z } from 'zod';

export const loginSchema = z.object({
  emailAddress: z
    .string()
    .min(3, 'Email is required')
    .email('Entered email is invalid.'),
  password: z.string().min(3, 'Password is required'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
