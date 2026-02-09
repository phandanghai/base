import { z } from 'zod';
export declare const SuccessResponseSchema: z.ZodObject<{
    success: z.ZodDefault<z.ZodBoolean>;
    message: z.ZodString;
    data: z.ZodOptional<z.ZodUnknown>;
    timestamp: z.ZodString;
}, z.core.$strip>;
export declare const ErrorResponseSchema: z.ZodObject<{
    success: z.ZodDefault<z.ZodBoolean>;
    message: z.ZodString;
    error: z.ZodOptional<z.ZodString>;
    statusCode: z.ZodNumber;
    timestamp: z.ZodString;
}, z.core.$strip>;
export declare const PaginationSchema: z.ZodObject<{
    page: z.ZodNumber;
    limit: z.ZodNumber;
    total: z.ZodNumber;
    totalPages: z.ZodNumber;
    hasNext: z.ZodBoolean;
    hasPrev: z.ZodBoolean;
}, z.core.$strip>;
export declare const PaginatedResponseSchema: z.ZodObject<{
    success: z.ZodDefault<z.ZodBoolean>;
    data: z.ZodArray<z.ZodUnknown>;
    pagination: z.ZodObject<{
        page: z.ZodNumber;
        limit: z.ZodNumber;
        total: z.ZodNumber;
        totalPages: z.ZodNumber;
        hasNext: z.ZodBoolean;
        hasPrev: z.ZodBoolean;
    }, z.core.$strip>;
    timestamp: z.ZodString;
}, z.core.$strip>;
export declare const UUIDSchema: z.ZodString;
export declare const ObjectIdSchema: z.ZodString;
export declare const EmailSchema: z.ZodString;
export declare const PasswordSchema: z.ZodString;
export declare const PhoneSchema: z.ZodString;
export declare const URLSchema: z.ZodString;
export type SuccessResponse = z.infer<typeof SuccessResponseSchema>;
export type ErrorResponse = z.infer<typeof ErrorResponseSchema>;
export type Pagination = z.infer<typeof PaginationSchema>;
export type PaginatedResponse = z.infer<typeof PaginatedResponseSchema>;
export declare const createSuccessResponse: (message: string, data?: unknown) => SuccessResponse;
export declare const createErrorResponse: (message: string, statusCode: number, error?: string) => ErrorResponse;
export declare const createPaginatedResponse: (data: unknown[], pagination: Pagination) => PaginatedResponse;
