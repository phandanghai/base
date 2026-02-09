import { ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
interface JwtUser {
    id: string;
    email: string;
    username: string;
    role: string;
}
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
    protected reflector: Reflector;
    private readonly logger;
    constructor(reflector: Reflector);
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | import("rxjs").Observable<boolean>;
    handleRequest<TUser = JwtUser>(err: Error | null, user: TUser | null, info: unknown, context: ExecutionContext, status?: number): TUser;
}
export {};
