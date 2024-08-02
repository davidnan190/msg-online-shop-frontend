import { z } from 'zod';

export const placeOrderSchema = z.object({
  country: z.string().min(3, 'Country is required'),
  city: z.string().min(3, 'City is required'),
  county: z.string().min(3, 'County is required'),
  streetAddress: z.string().min(3, 'Street address is required'),
});

export type PlaceOrderSchema = z.infer<typeof placeOrderSchema>;
