import { User } from './model.interface';

// Define specific response types for better type safety

export interface RmqMessage<
  TPattern extends string,
  TPayload,
  TResponse,
  TQueue extends string = string,
> {
  pattern: TPattern;
  payload: TPayload;
  response: TResponse;
  queue?: TQueue;
  description?: string;
}

export type RmqModuleContract = Record<
  string,
  RmqMessage<string, unknown, unknown, string>
>;

export type RmqContract = {
  [K in
    | 'USER'
    | 'AUTH'
    | 'WALLET'
    | 'TRANSACTION'
    | 'REDIS']: RmqModuleContract;
};

export interface RabbitPatternInterface {
  pattern: string;
  payload: unknown;
  queue: string;
  response: unknown;
  description: string;
}
export interface CreateUserResponse {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetUserByIdResponse {
  success: boolean;
  data: User | null;
  message?: string;
}

export interface UpdateUserResponse {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  isActive: boolean;
  role: string;
  updatedAt: Date;
}

export interface DeleteUserResponse {
  success: boolean;
  message: string;
  deletedUser?: {
    id: string;
    email: string;
  };
}

export interface GetAllUsersResponse {
  success: boolean;
  data: User[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages?: number;
  };
  message?: string;
}

// Define payload types
export interface CreateUserPayload {
  email: string;
  password: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  phone?: string;
  isActive?: boolean;
  role?: string;
}

export interface RegisterUserPayload {
  email?: string;
  username?: string;
  password: string;
  firstName: string;
  lastName: string;
  deviceId: string;
}
export interface GetUserByIdPayload {
  id: string;
}

export interface UserFieldValuePayload {
  field: string;
  value: string;
}

export interface UpdateUserPayload {
  id: string;
  data: Partial<CreateUserPayload>;
}

export interface UpdatePasswordUserPayload {
  id: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export interface DeleteUserPayload {
  id: string;
}

export interface GetAllUsersPayload {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SendOtpPayload {
  email?: string;
  username?: string;
}

export interface VerifyOtpPayload {
  email?: string;
  username?: string;
  otp: string | number;
}

export interface ResetPasswordPayload {
  jti: string;
  newPassword: string;
  confirmPassword: string;
}

//-----------------REDIS-----------//
export interface RedisKeyPayload {
  field?: string;
}

export interface RedisObjectPayload {
  key: string;
  value: string;
  ttl?: string | number;
}

export interface RedisUpdatePayload {
  field: string;
  updates: Record<string, unknown>;
}
