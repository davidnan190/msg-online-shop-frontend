import { z } from 'zod';

export const createProductSchema = z.object({
  name: z.string().min(3, 'Name is required'),
  description: z.string().min(3, 'Description is required'),
  price: z.number().min(1, 'Price must be positive'),
  weight: z.number().min(1, 'Weight must be positive'),
  imageUrl: z.string().optional(),
  categoryId: z.string().min(1, 'Category is required'),
  supplier: z.string().min(5, 'Supplier is required'),
  stockData: z
    .array(
      z.object({
        locationId: z.string().min(1, 'Location ID is required'),
        quantity: z.number().min(1, 'Quantity must be positive'),
      })
    )
    .min(1, 'At least one stock entry is required'),
});

export type CreateProductSchema = z.infer<typeof createProductSchema>;
