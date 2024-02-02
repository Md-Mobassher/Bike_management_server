import { z } from 'zod';

export const salesValidationSchema = z.object({
  bikeId: z.string(),
  quantity: z.number().int().positive(),
  buyerName: z.string(),
  salesDate: z.string(),
});
