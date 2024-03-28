import { z } from 'zod';

const createMaintenanceValidationSchema = z.object({
  bikeId: z.string(),
  lastServicingDate: z.string(),
  nextServicingDate: z.string(),
  serviceDetails: z.array(z.string()),
  notes: z.string(),
});

const updateMaintenanceValidationSchema = z.object({
  bikeId: z.string().optional(),
  lastServicingDate: z.string().optional(),
  nextServicingDate: z.string().optional(),
  serviceDetails: z.array(z.string()).optional(),
  notes: z.string().optional(),
  isPending: z.boolean().optional(),
  discount: z
    .object({
      percentage: z.number().optional(),
      fixedAmount: z.number().optional(),
    })
    .optional(),
});

export const MaintenanceVAlidation = {
  createMaintenanceValidationSchema,
  updateMaintenanceValidationSchema,
};
