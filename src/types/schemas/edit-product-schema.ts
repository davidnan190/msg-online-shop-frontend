import { z } from 'zod';

export const editProductSchema = z.object({
  id: z.string(),
  name: z.string().min(3, 'Name is required'),
  description: z.string().min(3, 'Description is required'),
  price: z.number().min(1, 'Price must be positive'),
  weight: z.number().min(1, 'Weight must be positive'),
  imageUrl: z.string().url('Invalid URL').optional(),
  categoryId: z.string().min(1, 'Category is required'),
});

export type EditProductSchema = z.infer<typeof editProductSchema>;
