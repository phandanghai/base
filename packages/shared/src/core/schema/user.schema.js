"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.safeValidateUserQuery = exports.safeValidateChangePassword = exports.safeValidateUpdateUser = exports.safeValidateCreateUser = exports.validateUserQuery = exports.validateChangePassword = exports.validateUpdateUser = exports.validateCreateUser = exports.UserFieldValueSchema = exports.UserResponseSchema = exports.UserQuerySchema = exports.ChangePasswordSchema = exports.DynamicObjectSchema = exports.UpdateUserSchema = exports.CreateUserSchema = exports.UserSchema = exports.UserRoleSchema = void 0;
const zod_1 = require("zod");
exports.UserRoleSchema = zod_1.z.enum(['USER', 'ADMIN', 'MODERATOR']);
exports.UserSchema = zod_1.z.object({
    id: zod_1.z
        .string({
        message: 'UUID must be string ...',
    })
        .uuid({
        message: 'UUID must be uuid',
    }),
    email: zod_1.z
        .string({
        message: 'Email must be string ...',
    })
        .email('Invalid email format'),
    username: zod_1.z
        .string({
        message: 'Username must be string ...',
    })
        .min(3, 'Username must be at least 3 characters ...')
        .max(50, 'Username must be at maxium 50 characters ...'),
    firstName: zod_1.z
        .string()
        .min(1, 'First name is required')
        .max(20, 'FirstName must be maxium 20 characters ...'),
    lastName: zod_1.z
        .string()
        .min(1, 'Last name is required')
        .max(20, 'LastName must be maxium 20 characters ...'),
    password: zod_1.z
        .string({
        message: 'Password must be string ...',
    })
        .min(8, 'Password must be at least 8 characters'),
    avatar: zod_1.z.string().url('Invalid avatar URL').optional(),
    phone: zod_1.z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
        .optional(),
    isActive: zod_1.z.boolean().default(true),
    role: exports.UserRoleSchema.default('USER'),
    createdAt: zod_1.z.date(),
    updatedAt: zod_1.z.date(),
});
exports.CreateUserSchema = exports.UserSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
});
exports.UpdateUserSchema = exports.UserSchema.partial();
exports.DynamicObjectSchema = zod_1.z.record(zod_1.z.string(), zod_1.z.union([zod_1.z.string(), zod_1.z.number(), zod_1.z.boolean(), zod_1.z.null()]));
exports.ChangePasswordSchema = zod_1.z
    .object({
    currentPassword: zod_1.z
        .string()
        .min(8, 'New password must be at least 8 characters')
        .max(128, 'New password must not exceed 128 characters')
        .regex(/[a-z]/, 'Must include at least one lowercase letter')
        .regex(/[A-Z]/, 'Must include at least one uppercase letter')
        .regex(/[0-9]/, 'Must include at least one number')
        .regex(/[^a-zA-Z0-9]/, 'Must include at least one special character'),
    newPassword: zod_1.z
        .string()
        .min(8, 'New password must be at least 8 characters')
        .max(128, 'New password must not exceed 128 characters')
        .regex(/[a-z]/, 'Must include at least one lowercase letter')
        .regex(/[A-Z]/, 'Must include at least one uppercase letter')
        .regex(/[0-9]/, 'Must include at least one number')
        .regex(/[^a-zA-Z0-9]/, 'Must include at least one special character'),
    confirmPassword: zod_1.z
        .string()
        .min(8, 'New password must be at least 8 characters')
        .max(128, 'New password must not exceed 128 characters')
        .regex(/[a-z]/, 'Must include at least one lowercase letter')
        .regex(/[A-Z]/, 'Must include at least one uppercase letter')
        .regex(/[0-9]/, 'Must include at least one number')
        .regex(/[^a-zA-Z0-9]/, 'Must include at least one special character'),
})
    .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
});
exports.UserQuerySchema = zod_1.z.object({
    page: zod_1.z.coerce.number().min(1).default(1),
    limit: zod_1.z.coerce.number().min(1).max(100).default(10),
    search: zod_1.z.string().optional(),
    role: exports.UserRoleSchema.optional(),
    isActive: zod_1.z.coerce.boolean().optional(),
    sortBy: zod_1.z
        .enum(['createdAt', 'updatedAt', 'firstName', 'lastName', 'email'])
        .default('createdAt'),
    sortOrder: zod_1.z.enum(['asc', 'desc']).default('desc'),
});
exports.UserResponseSchema = exports.UserSchema.omit({ password: true });
exports.UserFieldValueSchema = zod_1.z.object({
    field: zod_1.z.string({
        message: 'Field must be string ...',
    }),
    value: zod_1.z.string({
        message: 'Value must be string ...',
    }),
});
const validateCreateUser = (data) => exports.CreateUserSchema.parse(data);
exports.validateCreateUser = validateCreateUser;
const validateUpdateUser = (data) => exports.UpdateUserSchema.parse(data);
exports.validateUpdateUser = validateUpdateUser;
const validateChangePassword = (data) => exports.ChangePasswordSchema.parse(data);
exports.validateChangePassword = validateChangePassword;
const validateUserQuery = (data) => exports.UserQuerySchema.parse(data);
exports.validateUserQuery = validateUserQuery;
const safeValidateCreateUser = (data) => exports.CreateUserSchema.safeParse(data);
exports.safeValidateCreateUser = safeValidateCreateUser;
const safeValidateUpdateUser = (data) => exports.UpdateUserSchema.safeParse(data);
exports.safeValidateUpdateUser = safeValidateUpdateUser;
const safeValidateChangePassword = (data) => exports.ChangePasswordSchema.safeParse(data);
exports.safeValidateChangePassword = safeValidateChangePassword;
const safeValidateUserQuery = (data) => exports.UserQuerySchema.safeParse(data);
exports.safeValidateUserQuery = safeValidateUserQuery;
//# sourceMappingURL=user.schema.js.map