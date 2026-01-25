import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CircuitBreaker } from '@/helper';
import { RMQ_SERVICE } from './rabbitmq.token';

@Injectable()
export class RabbitMQService {
  private readonly logger = new Logger(RabbitMQService.name);
  private readonly breaker = new CircuitBreaker(5, 60_000);

  constructor(
    @Inject(RMQ_SERVICE.USER) private readonly userClient: ClientProxy,
    @Inject(RMQ_SERVICE.AUTH) private readonly authClient: ClientProxy,
    @Inject(RMQ_SERVICE.REDIS) private readonly redisClient: ClientProxy,
    @Inject(RMQ_SERVICE.MAILER) private readonly mailerClient: ClientProxy,
  ) {}

  private getClientByPattern(pattern: string): ClientProxy {
    const prefix = pattern.split('.')[0];

    const clientMap = {
      USER: this.userClient,
      AUTH: this.authClient,
      REDIS: this.redisClient,
      MAILER: this.mailerClient,
    };

    const client = Object.entries(clientMap).find(([key]) => key === prefix)?.[1];

    if (!client) {
      this.logger.warn(`Unknown service prefix: ${prefix}, defaulting to USER service`);
      return this.userClient;
    }

    return client;
  }

  async send<TPayload = unknown, TResponse = unknown>(
    pattern: string,
    payload: TPayload,
  ): Promise<TResponse> {
    return this.breaker.exec(async () => {
      const client = this.getClientByPattern(pattern);

      this.logger.debug(`📤 RMQ send → ${pattern}`);

      const response$ = client.send<TResponse>(pattern, payload);
      const result = await firstValueFrom(response$);

      this.logger.debug(`📥 RMQ response ← ${pattern}`);
      return result;
    });
  }

  emit<TPayload = unknown>(pattern: string, payload: TPayload): void {
    const client = this.getClientByPattern(pattern);

    this.logger.debug(`🔥 RMQ emit → ${pattern}`);

    client.emit(pattern, payload);
  }
}
