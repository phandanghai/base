"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createPaginatedResponse = exports.createErrorResponse = exports.createSuccessResponse = exports.URLSchema = exports.PhoneSchema = exports.PasswordSchema = exports.EmailSchema = exports.ObjectIdSchema = exports.UUIDSchema = exports.PaginatedResponseSchema = exports.PaginationSchema = exports.ErrorResponseSchema = exports.SuccessResponseSchema = void 0;
const zod_1 = require("zod");
exports.SuccessResponseSchema = zod_1.z.object({
    success: zod_1.z.boolean().default(true),
    message: zod_1.z.string(),
    data: zod_1.z.unknown().optional(),
    timestamp: zod_1.z.string().datetime(),
});
exports.ErrorResponseSchema = zod_1.z.object({
    success: zod_1.z.boolean().default(false),
    message: zod_1.z.string(),
    error: zod_1.z.string().optional(),
    statusCode: zod_1.z.number(),
    timestamp: zod_1.z.string().datetime(),
});
exports.PaginationSchema = zod_1.z.object({
    page: zod_1.z.number().min(1),
    limit: zod_1.z.number().min(1).max(100),
    total: zod_1.z.number().min(0),
    totalPages: zod_1.z.number().min(0),
    hasNext: zod_1.z.boolean(),
    hasPrev: zod_1.z.boolean(),
});
exports.PaginatedResponseSchema = zod_1.z.object({
    success: zod_1.z.boolean().default(true),
    data: zod_1.z.array(zod_1.z.unknown()),
    pagination: exports.PaginationSchema,
    timestamp: zod_1.z.string().datetime(),
});
exports.UUIDSchema = zod_1.z.string().uuid('Invalid UUID format');
exports.ObjectIdSchema = zod_1.z.string().regex(/^[0-9a-fA-F]{24}$/, 'Invalid ObjectId format');
exports.EmailSchema = zod_1.z.string().email('Invalid email format');
exports.PasswordSchema = zod_1.z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, 'Password must contain at least one uppercase letter, one lowercase letter, and one number');
exports.PhoneSchema = zod_1.z.string().regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number format');
exports.URLSchema = zod_1.z.string().url('Invalid URL format');
const createSuccessResponse = (message, data) => ({
    success: true,
    message,
    data,
    timestamp: new Date().toISOString(),
});
exports.createSuccessResponse = createSuccessResponse;
const createErrorResponse = (message, statusCode, error) => ({
    success: false,
    message,
    error,
    statusCode,
    timestamp: new Date().toISOString(),
});
exports.createErrorResponse = createErrorResponse;
const createPaginatedResponse = (data, pagination) => ({
    success: true,
    data,
    pagination,
    timestamp: new Date().toISOString(),
});
exports.createPaginatedResponse = createPaginatedResponse;
//# sourceMappingURL=common.schema.js.map