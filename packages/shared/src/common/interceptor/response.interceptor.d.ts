import { ResponseInterface } from '../../core/interface';
import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
export declare class ResponseInterceptor<T> implements NestInterceptor<T, ResponseInterface<T>> {
    private reflector;
    constructor(reflector: Reflector);
    intercept(context: ExecutionContext, next: CallHandler<T>): Observable<ResponseInterface<T>>;
}
