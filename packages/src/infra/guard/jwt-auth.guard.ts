import {
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '../../common/decorator';

interface JwtUser {
  id: string;
  email: string;
  username: string;
  role: string;
}

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(protected reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    this.logger.log('=== JwtAuthGuard canActivate ===');

    // Check if the route is public
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    this.logger.log(`Route is public: ${isPublic}`);

    if (isPublic) {
      this.logger.log('✅ Public route - skipping authentication');
      return true;
    }

    this.logger.log('🔒 Protected route - checking authentication');

    // Add your custom authentication logic here
    // For example, call super.logIn(request) to establish a session.
    return super.canActivate(context);
  }

  handleRequest<TUser = JwtUser>(
    err: Error | null,
    user: TUser | null,
    info: unknown,
    context: ExecutionContext,
    status?: number,
  ): TUser {
    this.logger.log('=== JwtAuthGuard handleRequest ===');
    this.logger.log('Error:', err);
    this.logger.log('User:', user);
    this.logger.log('Info:', info);
    this.logger.log('Status:', status);

    if (err || !user) {
      this.logger.error('❌ Authentication failed:', err || 'No user found');
      throw err ?? new UnauthorizedException('Invalid or expired token');
    }

    this.logger.log('✅ Authentication successful:', user);
    return user;
  }
}
