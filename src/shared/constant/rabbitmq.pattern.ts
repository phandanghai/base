import {
  CreateUserPayload,
  CreateUserResponse,
  DeleteUserPayload,
  DeleteUserResponse,
  GetAllUsersPayload,
  GetAllUsersResponse,
  RedisKeyPayload,
  RedisObjectPayload,
  RedisUpdatePayload,
  RegisterUserPayload,
  ResetPasswordPayload,
  SendOtpPayload,
  UpdatePasswordUserPayload,
  UpdateUserPayload,
  VerifyOtpPayload,
} from '@/interface';
import { RABBITMQ_QUEUE } from './rabbitmq.queue';
import { User } from '@/schema/user.schema';
import { definePattern } from '@/helper';

export const RABBIT_PATTERN = {
  USER: {
    CREATE_NEW_USER: definePattern<CreateUserPayload, CreateUserResponse>()({
      pattern: 'USER.CREATE_NEW_USER',
      queue: RABBITMQ_QUEUE.USER_CLIENT,
      description: 'Create new user in database successfully',
    }),

    GET_USER_BY_FIELD: definePattern<Array<{ field: string; value: string }>, User | null>()({
      pattern: 'USER.GET_USER_BY_FIELD',
      queue: RABBITMQ_QUEUE.USER_CLIENT,
      description: 'Get user by field successfully ...',
    }),

    UPDATE_USER_BY_ID: definePattern<UpdateUserPayload, User>()({
      pattern: 'USER.UPDATE_USER',
      queue: RABBITMQ_QUEUE.USER_CLIENT,
      description: 'Update user information',
    }),

    UPDATE_PASSWORD_USER_BY_ID: definePattern<UpdatePasswordUserPayload, User>()({
      pattern: 'USER.UPDATE_PASSWORD_USER',
      queue: RABBITMQ_QUEUE.USER_CLIENT,
      description: 'Update password user successfully ...',
    }),

    DELETE_USER: definePattern<DeleteUserPayload, DeleteUserResponse>()({
      pattern: 'USER.DELETE_USER',
      queue: RABBITMQ_QUEUE.USER_CLIENT,
      description: 'Delete user by ID',
    }),

    GET_ALL_USERS: definePattern<GetAllUsersPayload, GetAllUsersResponse>()({
      pattern: 'USER.GET_ALL_USERS',
      queue: RABBITMQ_QUEUE.USER_CLIENT,
      description: 'Get all users with pagination and search',
    }),

    GET_INFO_USER: definePattern<string, User | null>()({
      pattern: 'USER.GET_INFO_USER',
      queue: RABBITMQ_QUEUE.USER_CLIENT,
      description: 'Get info user successfully ...',
    }),

    TEST: definePattern<Record<string, string>, Record<string, string>>()({
      pattern: 'USER.TEST',
      queue: RABBITMQ_QUEUE.USER_CLIENT,
      description: 'Test request successfully ...',
    }),
  },

  AUTH: {
    TEST: definePattern<RegisterUserPayload, User>()({
      pattern: 'AUTH.TEST_REQUEST',
      queue: RABBITMQ_QUEUE.AUTH_CLIENT,
      description: 'Test request successfully ...',
    }),

    LOGIN_USER: definePattern<CreateUserPayload, CreateUserResponse>()({
      pattern: 'AUTH.LOGIN_USER',
      queue: RABBITMQ_QUEUE.AUTH_CLIENT,
      description: 'Login user successfully ...',
    }),

    REGISTER_USER: definePattern<RegisterUserPayload, CreateUserResponse>()({
      pattern: 'AUTH.REGISTER_USER',
      queue: RABBITMQ_QUEUE.AUTH_CLIENT,
      description: 'Register new user successfully ...',
    }),

    SEND_OTP: definePattern<SendOtpPayload, null>()({
      pattern: 'AUTH.SEND_OTP',
      queue: RABBITMQ_QUEUE.AUTH_CLIENT,
      description: 'Send OTP successfully ...',
    }),

    VERIFY_OTP: definePattern<VerifyOtpPayload, null>()({
      pattern: 'AUTH.VERIFY_OTP',
      queue: RABBITMQ_QUEUE.AUTH_CLIENT,
      description: 'Verify OTP successfully ...',
    }),

    RESET_PASSWORD: definePattern<ResetPasswordPayload, boolean>()({
      pattern: 'AUTH.RESET_PASSWORD',
      queue: RABBITMQ_QUEUE.AUTH_CLIENT,
      description: 'Reset password successfully ...',
    }),

    REFRESH_TOKEN: definePattern<{ refreshToken: string }, unknown>()({
      pattern: 'AUTH.REFRESH_TOKEN',
      queue: RABBITMQ_QUEUE.AUTH_CLIENT,
      description: 'Refresh token successfully ...',
    }),
  },

  REDIS: {
    GET: definePattern<RedisKeyPayload, Record<string, unknown>>()({
      pattern: 'REDIS.GET',
      queue: RABBITMQ_QUEUE.REDIS_CLIENT,
      description: 'Get redis value successfully ...',
    }),

    GET_PATTERN: definePattern<RedisKeyPayload, Record<string, unknown>>()({
      pattern: 'REDIS.GET_PATTERN',
      queue: RABBITMQ_QUEUE.REDIS_CLIENT,
      description: 'Get redis value by pattern successfully ...',
    }),

    SET: definePattern<RedisObjectPayload, Record<string, unknown>>()({
      pattern: 'REDIS.SET',
      queue: RABBITMQ_QUEUE.REDIS_CLIENT,
      description: 'Set redis value successfully ...',
    }),

    UPDATE: definePattern<RedisUpdatePayload, Record<string, unknown>>()({
      pattern: 'REDIS.UPDATE',
      queue: RABBITMQ_QUEUE.REDIS_CLIENT,
      description: 'Update redis data successfully ...',
    }),

    DEL: definePattern<RedisKeyPayload, Record<string, unknown>>()({
      pattern: 'REDIS.DEL',
      queue: RABBITMQ_QUEUE.REDIS_CLIENT,
      description: 'Delete redis value successfully ...',
    }),

    DEL_PATTERN: definePattern<RedisKeyPayload, Record<string, unknown>>()({
      pattern: 'REDIS.DEL_PATTERN',
      queue: RABBITMQ_QUEUE.REDIS_CLIENT,
      description: 'Delete redis value by pattern successfully ...',
    }),
  },

  EMAIL: {
    SEND_OTP: definePattern<
      {
        to: string;
        userName: string;
        otpCode: string;
        expiryMinutes: number;
      },
      unknown
    >()({
      pattern: 'EMAIL.SEND_OTP',
      queue: RABBITMQ_QUEUE.MAILER_CLIENT,
      description: 'Send OTP email successfully',
    }),
  },
} as const;

export type RabbitPattern = typeof RABBIT_PATTERN;
export type RedisPatterns = RabbitPattern['REDIS'];
