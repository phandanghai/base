import { CreateUserPayload, CreateUserResponse, DeleteUserPayload, DeleteUserResponse, GetAllUsersPayload, GetAllUsersResponse, RedisKeyPayload, RedisObjectPayload, RedisUpdatePayload, RegisterUserPayload, ResetPasswordPayload, SendOtpPayload, UpdatePasswordUserPayload, UpdateUserPayload, VerifyOtpPayload } from '../interface/rabbit_pattern.interface';
export declare const RABBIT_PATTERN: {
    readonly USER: {
        readonly CREATE_NEW_USER: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: CreateUserPayload | undefined;
            __responseType?: CreateUserResponse | undefined;
        };
        readonly GET_USER_BY_FIELD: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: {
                field: string;
                value: string;
            }[] | undefined;
            __responseType?: {
                id: string;
                email: string;
                username: string;
                firstName: string;
                lastName: string;
                password: string;
                isActive: boolean;
                role: "USER" | "ADMIN" | "MODERATOR";
                createdAt: Date;
                updatedAt: Date;
                avatar?: string | undefined;
                phone?: string | undefined;
            } | null | undefined;
        };
        readonly UPDATE_USER_BY_ID: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: UpdateUserPayload | undefined;
            __responseType?: {
                id: string;
                email: string;
                username: string;
                firstName: string;
                lastName: string;
                password: string;
                isActive: boolean;
                role: "USER" | "ADMIN" | "MODERATOR";
                createdAt: Date;
                updatedAt: Date;
                avatar?: string | undefined;
                phone?: string | undefined;
            } | undefined;
        };
        readonly UPDATE_PASSWORD_USER_BY_ID: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: UpdatePasswordUserPayload | undefined;
            __responseType?: {
                id: string;
                email: string;
                username: string;
                firstName: string;
                lastName: string;
                password: string;
                isActive: boolean;
                role: "USER" | "ADMIN" | "MODERATOR";
                createdAt: Date;
                updatedAt: Date;
                avatar?: string | undefined;
                phone?: string | undefined;
            } | undefined;
        };
        readonly DELETE_USER: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: DeleteUserPayload | undefined;
            __responseType?: DeleteUserResponse | undefined;
        };
        readonly GET_ALL_USERS: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: GetAllUsersPayload | undefined;
            __responseType?: GetAllUsersResponse | undefined;
        };
        readonly GET_INFO_USER: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: string | undefined;
            __responseType?: {
                id: string;
                email: string;
                username: string;
                firstName: string;
                lastName: string;
                password: string;
                isActive: boolean;
                role: "USER" | "ADMIN" | "MODERATOR";
                createdAt: Date;
                updatedAt: Date;
                avatar?: string | undefined;
                phone?: string | undefined;
            } | null | undefined;
        };
        readonly TEST: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: Record<string, string> | undefined;
            __responseType?: Record<string, string> | undefined;
        };
    };
    readonly AUTH: {
        readonly TEST: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: RegisterUserPayload | undefined;
            __responseType?: {
                id: string;
                email: string;
                username: string;
                firstName: string;
                lastName: string;
                password: string;
                isActive: boolean;
                role: "USER" | "ADMIN" | "MODERATOR";
                createdAt: Date;
                updatedAt: Date;
                avatar?: string | undefined;
                phone?: string | undefined;
            } | undefined;
        };
        readonly LOGIN_USER: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: CreateUserPayload | undefined;
            __responseType?: CreateUserResponse | undefined;
        };
        readonly REGISTER_USER: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: RegisterUserPayload | undefined;
            __responseType?: CreateUserResponse | undefined;
        };
        readonly SEND_OTP: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: SendOtpPayload | undefined;
            __responseType?: null | undefined;
        };
        readonly VERIFY_OTP: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: VerifyOtpPayload | undefined;
            __responseType?: null | undefined;
        };
        readonly RESET_PASSWORD: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: ResetPasswordPayload | undefined;
            __responseType?: boolean | undefined;
        };
        readonly REFRESH_TOKEN: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: {
                refreshToken: string;
            } | undefined;
            __responseType?: unknown;
        };
    };
    readonly REDIS: {
        readonly GET: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: RedisKeyPayload | undefined;
            __responseType?: Record<string, unknown> | undefined;
        };
        readonly GET_PATTERN: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: RedisKeyPayload | undefined;
            __responseType?: Record<string, unknown> | undefined;
        };
        readonly SET: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: RedisObjectPayload | undefined;
            __responseType?: Record<string, unknown> | undefined;
        };
        readonly UPDATE: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: RedisUpdatePayload | undefined;
            __responseType?: Record<string, unknown> | undefined;
        };
        readonly DEL: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: RedisKeyPayload | undefined;
            __responseType?: Record<string, unknown> | undefined;
        };
        readonly DEL_PATTERN: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: RedisKeyPayload | undefined;
            __responseType?: Record<string, unknown> | undefined;
        };
    };
    readonly EMAIL: {
        readonly SEND_OTP: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: {
                to: string;
                userName: string;
                otpCode: string;
                expiryMinutes: number;
            } | undefined;
            __responseType?: unknown;
        };
    };
};
export type RabbitPattern = typeof RABBIT_PATTERN;
export type RedisPatterns = RabbitPattern['REDIS'];
