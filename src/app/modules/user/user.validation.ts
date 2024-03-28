import { z } from 'zod';

const createUserValidationSchema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z
    .string({
      invalid_type_error: 'Password must be string',
    })
    .max(20, { message: 'Password can not be more than 20 characters' }),
  contactNo: z.string(),
  gender: z.enum(['male', 'female', 'other']),
  dateOfBirth: z.string(),
  role: z.enum(['buyer', 'seller']),
  presentAddress: z.string(),
  permanentAddress: z.string(),
});

export const UserValidation = {
  createUserValidationSchema,
};
