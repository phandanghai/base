import { z } from 'zod';

// Enum schema
export const UserRoleSchema = z.enum(['USER', 'ADMIN', 'MODERATOR']);

// Base User schema (matches Prisma model)
export const UserSchema = z.object({
  id: z
    .string({
      message: 'UUID must be string ...',
    })
    .uuid({
      message: 'UUID must be uuid',
    }),
  email: z
    .string({
      message: 'Email must be string ...',
    })
    .email('Invalid email format'),
  username: z
    .string({
      message: 'Username must be string ...',
    })
    .min(3, 'Username must be at least 3 characters ...')
    .max(50, 'Username must be at maxium 50 characters ...'),
  firstName: z
    .string()
    .min(1, 'First name is required')
    .max(20, 'FirstName must be maxium 20 characters ...'),
  lastName: z
    .string()
    .min(1, 'Last name is required')
    .max(20, 'LastName must be maxium 20 characters ...'),
  password: z
    .string({
      message: 'Password must be string ...',
    })
    .min(8, 'Password must be at least 8 characters'),
  avatar: z.string().url('Invalid avatar URL').optional(),
  phone: z
    .string()
    .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format')
    .optional(),
  isActive: z.boolean().default(true),
  role: UserRoleSchema.default('USER'),
  createdAt: z.date(),
  updatedAt: z.date(),
});

// Create User schema (without id, timestamps)
export const CreateUserSchema = UserSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

// Update User schema (all fields optional except id)
export const UpdateUserSchema = UserSchema.partial();

export const DynamicObjectSchema = z.record(
  z.string(), // 🔑 key type
  z.union([z.string(), z.number(), z.boolean(), z.null()]),
);
// Change password schema
export const ChangePasswordSchema = z
  .object({
    currentPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters')
      .max(128, 'New password must not exceed 128 characters')
      .regex(/[a-z]/, 'Must include at least one lowercase letter')
      .regex(/[A-Z]/, 'Must include at least one uppercase letter')
      .regex(/[0-9]/, 'Must include at least one number')
      .regex(/[^a-zA-Z0-9]/, 'Must include at least one special character'),
    newPassword: z
      .string()
      .min(8, 'New password must be at least 8 characters')
      .max(128, 'New password must not exceed 128 characters')
      .regex(/[a-z]/, 'Must include at least one lowercase letter')
      .regex(/[A-Z]/, 'Must include at least one uppercase letter')
      .regex(/[0-9]/, 'Must include at least one number')
      .regex(/[^a-zA-Z0-9]/, 'Must include at least one special character'),
    confirmPassword: z
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

// User query/filter schema
export const UserQuerySchema = z.object({
  page: z.coerce.number().min(1).default(1),
  limit: z.coerce.number().min(1).max(100).default(10),
  search: z.string().optional(),
  role: UserRoleSchema.optional(),
  isActive: z.coerce.boolean().optional(),
  sortBy: z.enum(['createdAt', 'updatedAt', 'firstName', 'lastName', 'email']).default('createdAt'),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

// User response schema (without password)
export const UserResponseSchema = UserSchema.omit({ password: true });

// User field value schema for dynamic queries
export const UserFieldValueSchema = z.object({
  field: z.string({
    message: 'Field must be string ...',
  }),
  value: z.string({
    message: 'Value must be string ...',
  }),
});

// Types derived from schemas
export type User = z.infer<typeof UserSchema>;
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
export type UserQueryDto = z.infer<typeof UserQuerySchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type UserRole = z.infer<typeof UserRoleSchema>;
export type UserFieldValueDto = z.infer<typeof UserFieldValueSchema>;

// Validation helpers
export const validateCreateUser = (data: unknown) => CreateUserSchema.parse(data);
export const validateUpdateUser = (data: unknown) => UpdateUserSchema.parse(data);
export const validateChangePassword = (data: unknown) => ChangePasswordSchema.parse(data);
export const validateUserQuery = (data: unknown) => UserQuerySchema.parse(data);

// Safe validation helpers (returns result object)
export const safeValidateCreateUser = (data: unknown) => CreateUserSchema.safeParse(data);
export const safeValidateUpdateUser = (data: unknown) => UpdateUserSchema.safeParse(data);
export const safeValidateChangePassword = (data: unknown) => ChangePasswordSchema.safeParse(data);
export const safeValidateUserQuery = (data: unknown) => UserQuerySchema.safeParse(data);
