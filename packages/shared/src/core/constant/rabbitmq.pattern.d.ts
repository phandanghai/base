import { CreateUserPayload, CreateUserResponse, DeleteUserPayload, DeleteUserResponse, GetAllUsersPayload, GetAllUsersResponse, RedisKeyPayload, RedisObjectPayload, RedisUpdatePayload, RegisterUserPayload, ResetPasswordPayload, SendOtpPayload, UpdatePasswordUserPayload, UpdateUserPayload, VerifyOtpPayload } from '../interface/rabbit_pattern.interface';
export declare const RABBIT_PATTERN: {
    readonly USER: {
        readonly CREATE_NEW_USER: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: CreateUserPayload;
            __responseType?: CreateUserResponse;
        };
        readonly GET_USER_BY_FIELD: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: {
                field: string;
                value: string;
            }[];
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
                avatar?: string;
                phone?: string;
            };
        };
        readonly UPDATE_USER_BY_ID: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: UpdateUserPayload;
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
                avatar?: string;
                phone?: string;
            };
        };
        readonly UPDATE_PASSWORD_USER_BY_ID: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: UpdatePasswordUserPayload;
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
                avatar?: string;
                phone?: string;
            };
        };
        readonly DELETE_USER: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: DeleteUserPayload;
            __responseType?: DeleteUserResponse;
        };
        readonly GET_ALL_USERS: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: GetAllUsersPayload;
            __responseType?: GetAllUsersResponse;
        };
        readonly GET_INFO_USER: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: string;
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
                avatar?: string;
                phone?: string;
            };
        };
        readonly TEST: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: Record<string, string>;
            __responseType?: Record<string, string>;
        };
    };
    readonly AUTH: {
        readonly TEST: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: RegisterUserPayload;
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
                avatar?: string;
                phone?: string;
            };
        };
        readonly LOGIN_USER: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: CreateUserPayload;
            __responseType?: CreateUserResponse;
        };
        readonly REGISTER_USER: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: RegisterUserPayload;
            __responseType?: CreateUserResponse;
        };
        readonly SEND_OTP: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: SendOtpPayload;
            __responseType?: null;
        };
        readonly VERIFY_OTP: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: VerifyOtpPayload;
            __responseType?: null;
        };
        readonly RESET_PASSWORD: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: ResetPasswordPayload;
            __responseType?: boolean;
        };
        readonly REFRESH_TOKEN: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: {
                refreshToken: string;
            };
            __responseType?: unknown;
        };
    };
    readonly REDIS: {
        readonly GET: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: RedisKeyPayload;
            __responseType?: Record<string, unknown>;
        };
        readonly GET_PATTERN: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: RedisKeyPayload;
            __responseType?: Record<string, unknown>;
        };
        readonly SET: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: RedisObjectPayload;
            __responseType?: Record<string, unknown>;
        };
        readonly UPDATE: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: RedisUpdatePayload;
            __responseType?: Record<string, unknown>;
        };
        readonly DEL: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: RedisKeyPayload;
            __responseType?: Record<string, unknown>;
        };
        readonly DEL_PATTERN: {
            pattern: string;
            queue: string;
            description: string;
        } & {
            __payloadType?: RedisKeyPayload;
            __responseType?: Record<string, unknown>;
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
            };
            __responseType?: unknown;
        };
    };
};
export type RabbitPattern = typeof RABBIT_PATTERN;
export type RedisPatterns = RabbitPattern['REDIS'];
