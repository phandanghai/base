import { Global, Module, OnModuleDestroy, Inject } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientProxy } from '@nestjs/microservices';
import { RabbitMQService } from './rabbitmq.service';
import { RMQ_SERVICE } from './rabbitmq.token';
import { rmqProviders } from './rabbitmq.provider';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [...rmqProviders, RabbitMQService],
  exports: [
    RabbitMQService,
    RMQ_SERVICE.USER,
    RMQ_SERVICE.AUTH,
    RMQ_SERVICE.REDIS,
    RMQ_SERVICE.MAILER,
  ],
})
export class RabbitMQModule implements OnModuleDestroy {
  constructor(
    @Inject(RMQ_SERVICE.USER)
    private readonly userClient: ClientProxy,
    @Inject(RMQ_SERVICE.AUTH)
    private readonly authClient: ClientProxy,
    @Inject(RMQ_SERVICE.REDIS)
    private readonly redisClient: ClientProxy,
    @Inject(RMQ_SERVICE.MAILER)
    private readonly mailerClient: ClientProxy,
  ) {}

  async onModuleDestroy() {
    await Promise.all([
      this.userClient.close(),
      this.authClient.close(),
      this.redisClient.close(),
      this.mailerClient.close(),
    ]);
  }
}
