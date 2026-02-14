import { z } from 'zod';

// Common response schemas
export const SuccessResponseSchema = z.object({
  success: z.boolean().default(true),
  message: z.string(),
  data: z.unknown().optional(),
  timestamp: z.string().datetime(),
});

export const ErrorResponseSchema = z.object({
  success: z.boolean().default(false),
  message: z.string(),
  error: z.string().optional(),
  statusCode: z.number(),
  timestamp: z.string().datetime(),
});

export const PaginationSchema = z.object({
  page: z.number().min(1),
  limit: z.number().min(1).max(100),
  total: z.number().min(0),
  totalPages: z.number().min(0),
  hasNext: z.boolean(),
  hasPrev: z.boolean(),
});

export const PaginatedResponseSchema = z.object({
  success: z.boolean().default(true),
  data: z.array(z.unknown()),
  pagination: PaginationSchema,
  timestamp: z.string().datetime(),
});

// ID validation schemas
export const UUIDSchema = z.string().uuid('Invalid UUID format');
export const ObjectIdSchema = z
  .string()
  .regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format');

// Common field schemas
export const EmailSchema = z.string().email('Invalid email format');
export const PasswordSchema = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .regex(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
    'Password must contain at least one uppercase letter, one lowercase letter, and one number',
  );
export const PhoneSchema = z
  .string()
  .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');
export const URLSchema = z.string().url('Invalid URL format');

// Types
export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;
export type PaginatedResponse = z.infer<typeof PaginatedResponseSchema>;

// Utility functions
export const createSuccessResponse = (
  message: string,
  data?: unknown,
): SuccessResponse => ({
  success: true,
  message,
  data,
  timestamp: new Date().toISOString(),
});

export const createErrorResponse = (
  message: string,
  statusCode: number,
  error?: string,
): ErrorResponse => ({
  success: false,
  message,
  error,
  statusCode,
  timestamp: new Date().toISOString(),
});

export const createPaginatedResponse = (
  data: unknown[],
  pagination: Pagination,
): PaginatedResponse => ({
  success: true,
  data,
  pagination,
  timestamp: new Date().toISOString(),
});

export const testSchema = z.object({
  label: z.string({
    message: 'Label must be string ...',
  }),
  value: z.string({
    message: 'Value must be string ...',
  }),
});

export type testDto = z.infer<typeof testSchema>;
export const validateTestSchema = (data: unknown) => testSchema.parse(data);
