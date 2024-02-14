import { z } from 'zod';

const loginValidationSchema = z.object({
  email: z.string({ required_error: 'Email is required' }).email(),
  password: z.string({ required_error: 'Password is required' }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({
      required_error: 'Refresh token is required!',
    }),
  }),
});

const forgetPasswordValidationSchema = z.object({
  email: z.string({
    required_error: 'User email is required!',
  }),
});

const resetPasswordValidationSchema = z.object({
  email: z.string({
    required_error: 'User email is required!',
  }),
  newPassword: z.string({
    required_error: 'User password is required!',
  }),
});

export const AuthValidation = {
  loginValidationSchema,
  refreshTokenValidationSchema,
  forgetPasswordValidationSchema,
  resetPasswordValidationSchema,
};
