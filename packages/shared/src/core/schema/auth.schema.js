"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RefreshTokenSchema = exports.ResetPasswordSchema = exports.RegisterSchema = exports.LoginSchema = void 0;
const zod_1 = require("zod");
exports.LoginSchema = zod_1.z
    .object({
    email: zod_1.z.string().email('Invalid email format').optional(),
    username: zod_1.z.string().min(3, 'Username too short').optional(),
    password: zod_1.z.string().min(1, 'Password is required'),
})
    .refine((data) => data.email ?? data.username, {
    message: 'Email or username is required',
    path: ['email'],
})
    .refine((data) => !(data.email && data.username), {
    message: 'Only one of email or username is allowed',
});
exports.RegisterSchema = zod_1.z.object({
    firstName: zod_1.z.string({ message: 'FirstName must be string ...' }),
    lastName: zod_1.z.string({ message: 'LastName must be string ...' }),
    email: zod_1.z.string({ message: 'Email must be string' }).email('Invalid email format'),
    password: zod_1.z.string().min(8, 'Password must be at least 8 characters'),
    confirmPassword: zod_1.z.string().min(8, 'Confirm Password must be at least 8 characters'),
});
exports.ResetPasswordSchema = zod_1.z.object({
    jti: zod_1.z.string({ message: 'Jti must be string ...' }).uuid({ message: 'Jti must be uuid ...' }),
    newPassword: zod_1.z.string({ message: 'Password must be string ...' }),
    confirmPassword: zod_1.z.string({ message: 'Confirm Password must be string ...' }),
});
exports.RefreshTokenSchema = zod_1.z.object({
    refreshToken: zod_1.z.string().min(1, 'Refresh token is required'),
});
//# sourceMappingURL=auth.schema.js.map