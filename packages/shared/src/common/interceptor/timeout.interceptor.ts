import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  GatewayTimeoutException,
} from '@nestjs/common';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { catchError, timeout } from 'rxjs/operators';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  constructor(private readonly timeoutMs = 5000) {}

  intercept(_: ExecutionContext, next: CallHandler): Observable<unknown> {
    return next.handle().pipe(
      timeout(this.timeoutMs),
      catchError((err : unknown) => {
        if (err instanceof TimeoutError) {
          return throwError(
            () => new GatewayTimeoutException('Gateway timeout waiting for microservice'),
          );
        }
        return throwError(() => err);
      }),
    );
  }
}
