import { ClientProxyFactory, ClientProxy } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Provider } from '@nestjs/common';
import { createRmqOptions } from './rabbitmq.config';
import { RMQ_SERVICE } from './rabbitmq.token';

export const rmqProviders: Provider<ClientProxy>[] = [
  {
    provide: RMQ_SERVICE.USER,
    useFactory: (config: ConfigService): ClientProxy =>
      ClientProxyFactory.create(createRmqOptions(config, 'USER_SERVICE')),
    inject: [ConfigService],
  },
  {
    provide: RMQ_SERVICE.AUTH,
    useFactory: (config: ConfigService): ClientProxy =>
      ClientProxyFactory.create(createRmqOptions(config, 'AUTH_SERVICE')),
    inject: [ConfigService],
  },
  {
    provide: RMQ_SERVICE.REDIS,
    useFactory: (config: ConfigService): ClientProxy =>
      ClientProxyFactory.create(createRmqOptions(config, 'REDIS_SERVICE')),
    inject: [ConfigService],
  },
    {
    provide: RMQ_SERVICE.MAILER,
    useFactory: (config: ConfigService): ClientProxy =>
      ClientProxyFactory.create(createRmqOptions(config, 'MAILER_SERVICE')),
    inject: [ConfigService],
  },
];
