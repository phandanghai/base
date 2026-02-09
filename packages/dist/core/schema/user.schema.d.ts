import { z } from 'zod';
export declare const UserRoleSchema: z.ZodEnum<{
    USER: "USER";
    ADMIN: "ADMIN";
    MODERATOR: "MODERATOR";
}>;
export declare const UserSchema: z.ZodObject<{
    id: z.ZodString;
    email: z.ZodString;
    username: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    password: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    role: z.ZodDefault<z.ZodEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
        MODERATOR: "MODERATOR";
    }>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
export declare const CreateUserSchema: z.ZodObject<{
    email: z.ZodString;
    username: z.ZodString;
    password: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    role: z.ZodDefault<z.ZodEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
        MODERATOR: "MODERATOR";
    }>>;
}, z.core.$strip>;
export declare const UpdateUserSchema: z.ZodObject<{
    id: z.ZodOptional<z.ZodString>;
    email: z.ZodOptional<z.ZodString>;
    username: z.ZodOptional<z.ZodString>;
    firstName: z.ZodOptional<z.ZodString>;
    lastName: z.ZodOptional<z.ZodString>;
    password: z.ZodOptional<z.ZodString>;
    avatar: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    phone: z.ZodOptional<z.ZodOptional<z.ZodString>>;
    isActive: z.ZodOptional<z.ZodDefault<z.ZodBoolean>>;
    role: z.ZodOptional<z.ZodDefault<z.ZodEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
        MODERATOR: "MODERATOR";
    }>>>;
    createdAt: z.ZodOptional<z.ZodDate>;
    updatedAt: z.ZodOptional<z.ZodDate>;
}, z.core.$strip>;
export declare const DynamicObjectSchema: z.ZodRecord<z.ZodString, z.ZodUnion<readonly [z.ZodString, z.ZodNumber, z.ZodBoolean, z.ZodNull]>>;
export declare const ChangePasswordSchema: z.ZodObject<{
    currentPassword: z.ZodString;
    newPassword: z.ZodString;
    confirmPassword: z.ZodString;
}, z.core.$strip>;
export declare const UserQuerySchema: z.ZodObject<{
    page: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    limit: z.ZodDefault<z.ZodCoercedNumber<unknown>>;
    search: z.ZodOptional<z.ZodString>;
    role: z.ZodOptional<z.ZodEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
        MODERATOR: "MODERATOR";
    }>>;
    isActive: z.ZodOptional<z.ZodCoercedBoolean<unknown>>;
    sortBy: z.ZodDefault<z.ZodEnum<{
        email: "email";
        firstName: "firstName";
        lastName: "lastName";
        createdAt: "createdAt";
        updatedAt: "updatedAt";
    }>>;
    sortOrder: z.ZodDefault<z.ZodEnum<{
        asc: "asc";
        desc: "desc";
    }>>;
}, z.core.$strip>;
export declare const UserResponseSchema: z.ZodObject<{
    email: z.ZodString;
    username: z.ZodString;
    firstName: z.ZodString;
    lastName: z.ZodString;
    id: z.ZodString;
    avatar: z.ZodOptional<z.ZodString>;
    phone: z.ZodOptional<z.ZodString>;
    isActive: z.ZodDefault<z.ZodBoolean>;
    role: z.ZodDefault<z.ZodEnum<{
        USER: "USER";
        ADMIN: "ADMIN";
        MODERATOR: "MODERATOR";
    }>>;
    createdAt: z.ZodDate;
    updatedAt: z.ZodDate;
}, z.core.$strip>;
export declare const UserFieldValueSchema: z.ZodObject<{
    field: z.ZodString;
    value: z.ZodString;
}, z.core.$strip>;
export type UserDto = z.infer<typeof UserSchema>;
export type CreateUserDto = z.infer<typeof CreateUserSchema>;
export type UpdateUserDto = z.infer<typeof UpdateUserSchema>;
export type ChangePasswordDto = z.infer<typeof ChangePasswordSchema>;
export type UserQueryDto = z.infer<typeof UserQuerySchema>;
export type UserResponse = z.infer<typeof UserResponseSchema>;
export type UserRoleDto = z.infer<typeof UserRoleSchema>;
export type UserFieldValueDto = z.infer<typeof UserFieldValueSchema>;
export declare const validateCreateUser: (data: unknown) => {
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    role: "USER" | "ADMIN" | "MODERATOR";
    avatar?: string | undefined;
    phone?: string | undefined;
};
export declare const validateUpdateUser: (data: unknown) => {
    id?: string | undefined;
    email?: string | undefined;
    username?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    password?: string | undefined;
    avatar?: string | undefined;
    phone?: string | undefined;
    isActive?: boolean | undefined;
    role?: "USER" | "ADMIN" | "MODERATOR" | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
};
export declare const validateChangePassword: (data: unknown) => {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
};
export declare const validateUserQuery: (data: unknown) => {
    page: number;
    limit: number;
    sortBy: "email" | "firstName" | "lastName" | "createdAt" | "updatedAt";
    sortOrder: "asc" | "desc";
    search?: string | undefined;
    role?: "USER" | "ADMIN" | "MODERATOR" | undefined;
    isActive?: boolean | undefined;
};
export declare const safeValidateCreateUser: (data: unknown) => z.ZodSafeParseResult<{
    email: string;
    username: string;
    password: string;
    firstName: string;
    lastName: string;
    isActive: boolean;
    role: "USER" | "ADMIN" | "MODERATOR";
    avatar?: string | undefined;
    phone?: string | undefined;
}>;
export declare const safeValidateUpdateUser: (data: unknown) => z.ZodSafeParseResult<{
    id?: string | undefined;
    email?: string | undefined;
    username?: string | undefined;
    firstName?: string | undefined;
    lastName?: string | undefined;
    password?: string | undefined;
    avatar?: string | undefined;
    phone?: string | undefined;
    isActive?: boolean | undefined;
    role?: "USER" | "ADMIN" | "MODERATOR" | undefined;
    createdAt?: Date | undefined;
    updatedAt?: Date | undefined;
}>;
export declare const safeValidateChangePassword: (data: unknown) => z.ZodSafeParseResult<{
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
}>;
export declare const safeValidateUserQuery: (data: unknown) => z.ZodSafeParseResult<{
    page: number;
    limit: number;
    sortBy: "email" | "firstName" | "lastName" | "createdAt" | "updatedAt";
    sortOrder: "asc" | "desc";
    search?: string | undefined;
    role?: "USER" | "ADMIN" | "MODERATOR" | undefined;
    isActive?: boolean | undefined;
}>;
