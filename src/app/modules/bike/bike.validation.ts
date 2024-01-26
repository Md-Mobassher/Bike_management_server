import { z } from 'zod';

const createBikeValidationSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  releaseDate: z.string(),
  brand: z.string().min(1),
  model: z.string().min(1),
  type: z.string().min(1),
  size: z.string().min(1),
  color: z.string().min(1),
  bikeImage: z.string().min(1).optional(),
});

export const BikeVAlidation = {
  createBikeValidationSchema,
};
