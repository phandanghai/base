import { z } from 'zod';

export const LoginSchema = z
  .object({
    email: z.string().email('Invalid email format').optional(),
    username: z.string().min(3, 'Username too short').optional(),
    password: z.string().min(1, 'Password is required'),
  })
  .refine((data) => data.email ?? data.username, {
    message: 'Email or username is required',
    path: ['email'],
  })
  .refine((data) => !(data.email && data.username), {
    message: 'Only one of email or username is allowed',
  });

export const RegisterSchema = z.object({
  firstName: z.string({ message: 'FirstName must be string ...' }),
  lastName: z.string({ message: 'LastName must be string ...' }),
  email: z.string({ message: 'Email must be string' }).email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z.string().min(8, 'Confirm Password must be at least 8 characters'),
});

export const ResetPasswordSchema = z.object({
  jti: z.string({ message: 'Jti must be string ...' }).uuid({ message: 'Jti must be uuid ...' }),
  newPassword: z.string({ message: 'Password must be string ...' }),
  confirmPassword: z.string({ message: 'Confirm Password must be string ...' }),
});

/**
 * =========================
 * REFRESH TOKEN
 * =========================
 */
export const RefreshTokenSchema = z.object({
  refreshToken: z.string().min(1, 'Refresh token is required'),
});

export type LoginUserDto = z.infer<typeof LoginSchema>;
export type RegisterUserDto = z.infer<typeof RegisterSchema>;
export type RefreshTokenUserDto = z.infer<typeof RefreshTokenSchema>;
export type ResetPassswordDto = z.infer<typeof ResetPasswordSchema>;
