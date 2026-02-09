import { RmqOptions } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
export interface RmqServiceConfig {
    name: string;
    queue: string;
    prefetchCount?: number;
}
export declare const RMQ_SERVICES: RmqServiceConfig[];
export declare const createRmqOptions: (configService: ConfigService, serviceName: string) => RmqOptions;
