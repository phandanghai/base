import { RmqOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { UnauthorizedException } from '@nestjs/common';

export interface RmqServiceConfig {
  name: string;
  queue: string;
  prefetchCount?: number;
}

export const RMQ_SERVICES: RmqServiceConfig[] = [
  { name: 'USER_SERVICE', queue: 'USER_QUEUE', prefetchCount: 10 },
  { name: 'AUTH_SERVICE', queue: 'AUTH_QUEUE', prefetchCount: 5 },
  { name: 'REDIS_SERVICE', queue: 'REDIS_QUEUE', prefetchCount: 15 },
  { name: 'MAILER_SERVICE', queue: 'MAILER_QUEUE', prefetchCount: 15 },
];

export const createRmqOptions = (
  configService: ConfigService,
  serviceName: string,
): RmqOptions => {
  const service = RMQ_SERVICES.find((s) => s.name === serviceName);
  const rabbitmqURL = configService.get<string>('RABBITMQ_URL');

  if (!service) {
    throw new UnauthorizedException(
      `RMQ service config not found: ${serviceName}`,
    );
  }

  if (!rabbitmqURL) {
    throw new UnauthorizedException(
      `RMQ URL service config not found or not exist : , ${rabbitmqURL}`,
    );
  }

  return {
    transport: Transport.RMQ,
    options: {
      urls: [configService.get<string>('RABBITMQ_URL')],
      queue: service.queue,
      queueOptions: { durable: true },
      prefetchCount: service.prefetchCount ?? 10,
    },
  };
};
