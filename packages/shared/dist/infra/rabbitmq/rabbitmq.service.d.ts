import { ClientProxy } from '@nestjs/microservices';
export declare class RabbitMQService {
    private readonly userClient;
    private readonly authClient;
    private readonly redisClient;
    private readonly mailerClient;
    private readonly logger;
    private readonly breaker;
    constructor(userClient: ClientProxy, authClient: ClientProxy, redisClient: ClientProxy, mailerClient: ClientProxy);
    private getClientByPattern;
    send<TPayload = unknown, TResponse = unknown>(pattern: string, payload: TPayload): Promise<TResponse>;
    emit<TPayload = unknown>(pattern: string, payload: TPayload): void;
}
