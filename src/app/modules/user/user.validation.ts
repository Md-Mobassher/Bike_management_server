import { z } from 'zod';

const userValidationSchema = z.object({
  email: z.string().email(),
  pasword: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' })
    .optional(),
  contactNo: z.string(),
});

export const UserValidation = {
  userValidationSchema,
};
