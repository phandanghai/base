"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RABBIT_PATTERN = void 0;
const rabbitmq_queue_1 = require("./rabbitmq.queue");
const rabbit_pattern_helper_1 = require("../../common/helper/rabbit.pattern.helper");
exports.RABBIT_PATTERN = {
    USER: {
        CREATE_NEW_USER: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'USER.CREATE_NEW_USER',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.USER_CLIENT,
            description: 'Create new user in database successfully',
        }),
        GET_USER_BY_FIELD: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'USER.GET_USER_BY_FIELD',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.USER_CLIENT,
            description: 'Get user by field successfully ...',
        }),
        UPDATE_USER_BY_ID: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'USER.UPDATE_USER',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.USER_CLIENT,
            description: 'Update user information',
        }),
        UPDATE_PASSWORD_USER_BY_ID: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'USER.UPDATE_PASSWORD_USER',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.USER_CLIENT,
            description: 'Update password user successfully ...',
        }),
        DELETE_USER: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'USER.DELETE_USER',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.USER_CLIENT,
            description: 'Delete user by ID',
        }),
        GET_ALL_USERS: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'USER.GET_ALL_USERS',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.USER_CLIENT,
            description: 'Get all users with pagination and search',
        }),
        GET_INFO_USER: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'USER.GET_INFO_USER',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.USER_CLIENT,
            description: 'Get info user successfully ...',
        }),
        TEST: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'USER.TEST',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.USER_CLIENT,
            description: 'Test request successfully ...',
        }),
    },
    AUTH: {
        TEST: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'AUTH.TEST_REQUEST',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.AUTH_CLIENT,
            description: 'Test request successfully ...',
        }),
        LOGIN_USER: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'AUTH.LOGIN_USER',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.AUTH_CLIENT,
            description: 'Login user successfully ...',
        }),
        REGISTER_USER: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'AUTH.REGISTER_USER',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.AUTH_CLIENT,
            description: 'Register new user successfully ...',
        }),
        SEND_OTP: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'AUTH.SEND_OTP',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.AUTH_CLIENT,
            description: 'Send OTP successfully ...',
        }),
        VERIFY_OTP: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'AUTH.VERIFY_OTP',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.AUTH_CLIENT,
            description: 'Verify OTP successfully ...',
        }),
        RESET_PASSWORD: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'AUTH.RESET_PASSWORD',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.AUTH_CLIENT,
            description: 'Reset password successfully ...',
        }),
        REFRESH_TOKEN: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'AUTH.REFRESH_TOKEN',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.AUTH_CLIENT,
            description: 'Refresh token successfully ...',
        }),
    },
    REDIS: {
        GET: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'REDIS.GET',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.REDIS_CLIENT,
            description: 'Get redis value successfully ...',
        }),
        GET_PATTERN: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'REDIS.GET_PATTERN',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.REDIS_CLIENT,
            description: 'Get redis value by pattern successfully ...',
        }),
        SET: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'REDIS.SET',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.REDIS_CLIENT,
            description: 'Set redis value successfully ...',
        }),
        UPDATE: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'REDIS.UPDATE',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.REDIS_CLIENT,
            description: 'Update redis data successfully ...',
        }),
        DEL: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'REDIS.DEL',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.REDIS_CLIENT,
            description: 'Delete redis value successfully ...',
        }),
        DEL_PATTERN: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'REDIS.DEL_PATTERN',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.REDIS_CLIENT,
            description: 'Delete redis value by pattern successfully ...',
        }),
    },
    EMAIL: {
        SEND_OTP: (0, rabbit_pattern_helper_1.definePattern)()({
            pattern: 'EMAIL.SEND_OTP',
            queue: rabbitmq_queue_1.RABBITMQ_QUEUE.MAILER_CLIENT,
            description: 'Send OTP email successfully',
        }),
    },
};
//# sourceMappingURL=rabbitmq.pattern.js.map