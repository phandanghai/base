import { ExceptionFilter, ArgumentsHost } from '@nestjs/common';
export declare class MsExceptionFilter implements ExceptionFilter {
    private readonly logger;
    private hasRpcErrorPayload;
    catch(exception: unknown, host: ArgumentsHost): import("rxjs").Observable<never>;
}
