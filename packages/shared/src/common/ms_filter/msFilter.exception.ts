import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  Logger,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { ZodError } from 'zod';
import { throwError } from 'rxjs';
import { MsErrorPayload } from '../../core/interface';
import { RMQ_SERVICE } from '../../infra/rabbitmq/rabbitmq.token';

@Catch()
export class MsExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(MsExceptionFilter.name);

  private hasRpcErrorPayload(
    exception: unknown,
  ): exception is { error: MsErrorPayload } {
    return (
      typeof exception === 'object' &&
      exception !== null &&
      'error' in exception &&
      typeof (exception as { error?: unknown }).error === 'object' &&
      (exception as { error?: unknown }).error !== null
    );
  }
  catch(exception: unknown, host: ArgumentsHost) {
    let pattern: string = 'unknown-pattern';
    this.logger.error('ms exception : ', exception);
    try {
      const ctx = host.switchToRpc();
      const context: unknown = ctx.getContext();

      if (
        context &&
        typeof context === 'object' &&
        'getPattern' in context &&
        typeof context.getPattern === 'function'
      ) {
        const getPatternFn = context.getPattern as () => unknown;
        const patternResult: unknown = getPatternFn();
        pattern =
          typeof patternResult === 'string'
            ? patternResult
            : String(patternResult);
      }
    } catch (error) {
      throwError(() => error);
    }

    /**
     * 1️⃣ RpcException → pass through
     */
    if (exception instanceof RpcException) {
      return throwError(() => exception);
    }

    /**
     * 2️⃣ Zod validation
     */
    if (exception instanceof ZodError) {
      this.logger.error('zod exception :', exception);
      return throwError(
        () =>
          new RpcException({
            statusCode: 400,
            message: exception.issues,
            errorType: 'ZOD_VALIDATION',
            stack: exception.stack,
            source: RMQ_SERVICE.AUTH,
          }),
      );
    }

    /**
     * 3️⃣ HttpException
     */
    if (exception instanceof HttpException) {
      const status = exception.getStatus();
      const response = exception.getResponse();

      this.logger.error(`🚨 HTTP Exception on pattern with status: ${status}`);

      return throwError(() => {
        let message: string;
        let details: unknown = undefined;

        if (typeof response === 'string') {
          message = response;
        } else if (response && typeof response === 'object') {
          // Handle structured response from validation pipes
          if ('message' in response && typeof response.message === 'string') {
            message = response.message;
          } else {
            message = exception.message;
          }

          // Preserve additional details from validation errors
          if (
            'errors' in response ||
            'details' in response ||
            'exceptionType' in response
          ) {
            details = response;
          }
        } else {
          message = exception.message;
        }

        const rpcExceptionPayload: Record<string, unknown> = {
          statusCode: status,
          message,
          stack: exception.stack,
          errorType: 'HTTP_EXCEPTION',
          source: RMQ_SERVICE.AUTH,
        };

        if (details && typeof details === 'object') {
          Object.assign(rpcExceptionPayload, { details });
        }

        return new RpcException(rpcExceptionPayload);
      });
    }

    /**
     * 4️⃣ Error thường
     */
    if (exception instanceof Error) {
      this.logger.error(`💥 General Error on pattern ${pattern}`);

      return throwError(
        () =>
          new RpcException({
            statusCode: 500,
            stack: exception.stack,
            message: exception.message,
            errorType: 'INTERNAL_ERROR',
            source: RMQ_SERVICE.AUTH,
          }),
      );
    }

    /**
     * 5️⃣ Unknown
     */

    if (this.hasRpcErrorPayload(exception)) {
      const { error } = exception;

      return throwError(
        () =>
          new RpcException({
            statusCode: error.statusCode ?? 500,
            message: error.message ?? 'Unknown error',
            errorType: error.type ?? 'UNKNOWN',
            source: error.source ?? RMQ_SERVICE.USER,
            stack: exception instanceof Error ? exception.stack : undefined,
          }),
      );
    }

    this.logger.error(`❓ Unknown exception on pattern ${pattern}`, exception);

    return throwError(
      () =>
        new RpcException({
          statusCode: 500,
          message: 'Unknown microservice error',
          errorType: 'UNKNOWN',
          source: RMQ_SERVICE.AUTH,
          stack: exception instanceof Error ? exception.stack : undefined,
        }),
    );
  }
}
