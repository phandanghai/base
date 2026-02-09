import { CallHandler, ExecutionContext, Logger, NestInterceptor } from '@nestjs/common';
export declare class LoggingInterceptor implements NestInterceptor {
    private readonly logger;
    constructor(logger: Logger);
    intercept(context: ExecutionContext, next: CallHandler): import("rxjs").Observable<any>;
}
