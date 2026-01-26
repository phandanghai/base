import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
  HttpException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError, catchError } from 'rxjs';
import { RpcException } from '@nestjs/microservices';
import { RmqTimeoutError } from '../helper';
import { ZodError } from 'zod';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  private readonly logger = new Logger(ErrorInterceptor.name);

  intercept(
    _context: ExecutionContext,
    next: CallHandler,
  ): Observable<unknown> {
    return next.handle().pipe(
      catchError((error: unknown) => {
        /**
         * @exception {ZodValidation Error}
         */
        if (error instanceof ZodError) {
          this.logger.warn('⏰Zod Validation failed ...');
          return throwError(() => error);
        }

        /**
         * @exception {Timeout Error}
         */
        if (error instanceof TimeoutError || error instanceof RmqTimeoutError) {
          this.logger.warn('⏰ Timeout detected');
          return throwError(() => error);
        }

        /**
         * @exception {RpcException Error}
         */
        if (error instanceof RpcException) {
          this.logger.error('rpc exception ...');
          return throwError(() => error);
        }

        /**
         * @exception {HttpException Error}
         */

        if (error instanceof HttpException) {
          this.logger.error('http exception error');
          return throwError(() => error);
        }
        return throwError(() => error);
      }),
    );
  }
}
