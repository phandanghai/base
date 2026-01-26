import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { Request } from 'express';

// Extend the Express Request interface to include the user property
interface AuthenticatedRequest extends Request {
  user?: any;
}

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const logger = new Logger('GetUser');
    const request: AuthenticatedRequest = ctx.switchToHttp().getRequest();

    logger.log('=== GetUser Decorator Debug ===');
    logger.log('Request headers:', JSON.stringify(request.headers, null, 2));
    logger.log('Request user:', request.user);
    logger.log('User type:', typeof request.user);

    if (!request.user) {
      logger.error('❌ request.user is undefined - authentication failed');
      throw new Error('User not authenticated');
    }

    logger.log('✅ User found:', request.user);
    return request.user;
  },
);
