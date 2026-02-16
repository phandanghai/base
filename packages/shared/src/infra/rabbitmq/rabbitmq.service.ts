import { Injectable, Logger, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { CircuitBreaker } from '../../common/helper';
import { RMQ_SERVICE } from './rabbitmq.token';

@Injectable()
export class RabbitMQService {
  private readonly logger = new Logger(RabbitMQService.name);
  private readonly breaker = new CircuitBreaker(5, 60_000);

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

  private getClientByPattern(pattern: string): ClientProxy {
    const prefix = pattern.split('.')[0];

    const clientMap = {
      USER: this.userClient,
      AUTH: this.authClient,
      REDIS: this.redisClient,
      MAILER: this.mailerClient,
    };

    const client = Object.entries(clientMap).find(
      ([key]) => key === prefix,
    )?.[1];

    if (!client) {
      this.logger.warn(
        `Unknown service prefix: ${prefix}, defaulting to USER service`,
      );
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
      this.logger.debug(`📦 Payload: ${JSON.stringify(payload)}`);

      try {
        const response$ = client.send<TResponse>(pattern, payload);

        // Add timeout to prevent hanging
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(
            () => reject(new Error('RabbitMQ request timeout after 10s')),
            10000,
          );
        });

        const result = await Promise.race([
          firstValueFrom(response$),
          timeoutPromise,
        ]);

        this.logger.debug(`📥 RMQ response ← ${pattern}`);
        this.logger.debug(`📦 Response: ${JSON.stringify(result)}`);
        return result;
      } catch (error) {
        this.logger.error(`❌ RMQ error for ${pattern}:`, error);
        throw error;
      }
    });
  }

  emit<TPayload = unknown>(pattern: string, payload: TPayload): void {
    const client = this.getClientByPattern(pattern);

    this.logger.debug(`🔥 RMQ emit → ${pattern}`);

    client.emit(pattern, payload);
  }
}
