import { z } from 'zod';

const createBikeValidationSchema = z.object({
  bikeId: z.string().min(4),
  name: z.string().min(3),
  price: z.number().positive(),
  quantity: z.number().int().positive(),
  releaseDate: z.string(),
  brand: z.string().min(1),
  model: z.string().min(1),
  type: z.string().min(1),
  size: z.string().min(1),
  color: z.string().min(1),
  gearType: z.string().min(1),
  material: z.string().min(1),
  suspensionType: z.string().min(1),
  bikeImage: z.string().min(1).optional(),
});

const updateBikeValidationSchema = z.object({
  bikeId: z.string().optional(),
  name: z.string().optional(),
  price: z.number().positive().optional(),
  quantity: z.number().int().positive().optional(),
  releaseDate: z.string().optional(),
  brand: z.string().min(1).optional(),
  model: z.string().min(1).optional(),
  type: z.string().min(1).optional(),
  size: z.string().min(1).optional(),
  color: z.string().min(1).optional(),
  gearType: z.string().min(1).optional(),
  material: z.string().min(1).optional(),
  suspensionType: z.string().min(1).optional(),
  bikeImage: z.string().min(1).optional().optional(),
});

const bulkDeleteBikeValidationSchema = z.object({
  bikeIds: z.array(z.string()),
});

export const BikeVAlidation = {
  createBikeValidationSchema,
  updateBikeValidationSchema,
  bulkDeleteBikeValidationSchema,
};
