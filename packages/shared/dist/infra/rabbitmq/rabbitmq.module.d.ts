import { OnModuleDestroy } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
export declare class RabbitMQModule implements OnModuleDestroy {
    private readonly userClient;
    private readonly authClient;
    private readonly redisClient;
    private readonly mailerClient;
    constructor(userClient: ClientProxy, authClient: ClientProxy, redisClient: ClientProxy, mailerClient: ClientProxy);
    onModuleDestroy(): Promise<void>;
}
