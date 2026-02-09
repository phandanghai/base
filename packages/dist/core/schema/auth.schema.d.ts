import { z } from 'zod';
export declare const LoginSchema: z.ZodObject<{
    email: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    password: z.ZodString;
}, z.core.$strip>;
export declare const RegisterSchema: z.ZodObject<{
    firstName: z.ZodString;
    lastName: z.ZodString;
    email: z.ZodString;
    password: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export declare const ResetPasswordSchema: z.ZodObject<{
    jti: z.ZodString;
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export declare const RefreshTokenSchema: z.ZodObject<{
    refreshToken: z.ZodString;
}, z.core.$strip>;
export type LoginUserDto = z.infer<typeof LoginSchema>;
export type RegisterUserDto = z.infer<typeof RegisterSchema>;
export type RefreshTokenUserDto = z.infer<typeof RefreshTokenSchema>;
export type ResetPassswordDto = z.infer<typeof ResetPasswordSchema>;
