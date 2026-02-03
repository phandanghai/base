import { RESPONSE_MESSAGE, STATUS_CODES } from '../decorators'
import { ResponseInterface } from '../../core/interface'
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { Request } from 'express'
import { Observable } from 'rxjs'
import { map } from 'rxjs/operators'

@Injectable()
export class ResponseInterceptor<T> implements NestInterceptor<T, ResponseInterface<T>> {
  constructor(private reflector: Reflector) {}

  intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ResponseInterface<T>> {
    const message = this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler())
    const _statusCodes = this.reflector.get<number>(STATUS_CODES, context.getHandler())
    const request: Request = context.switchToHttp().getRequest()

    return next.handle().pipe(
      map((data: T) => ({
        statusCode: _statusCodes,
        message: message ?? 'Success',
        data: data,
        request: {
          method: request.method,
          url: request.originalUrl,
          route: (request.route as { path?: string } | undefined)?.path,
          ip: request.ip,
          userAgent: request.headers['user-agent'],
        },
        timestamp: Date.now(),
      })),
    )
  }
}
