import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  ErrorInterceptor,
  TimeoutInterceptor,
  ResponseInterceptor,
} from '@shared';
import { MsExceptionFilter } from '@shared';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  // Wait a bit for external services (RabbitMQ, etc.) to be ready
  if (process.env.NODE_ENV !== 'production') {
    await new Promise((resolve) => setTimeout(resolve, 5000)); // 5 second delay
  }

  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const rabbitmqUrl = config.get<string>('RABBITMQ_URL');
  const rabbitmqQueue = config.get<string>('RABBITMQ_QUEUE');
  const globalTimeout = config.get<number>('GLOBAL_TIMEOUT') ?? 10000; // 10 seconds default

  Logger.log(`🔗 Connecting to RabbitMQ: ${rabbitmqUrl}`);
  Logger.log(`📥 Listening on queue: ${rabbitmqQueue}`);

  // Connect to RabbitMQ as a microservice
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitmqUrl ?? 'amqp://localhost:5672'],
      queue: rabbitmqQueue ?? 'REDIS_QUEUE',
      queueOptions: { durable: true },
      prefetchCount: Number(config.get('RABBITMQ_PREFETCH')) || 1,
    },
  });

  app.useGlobalInterceptors(new TimeoutInterceptor(globalTimeout)); // Apply timeout first
  app.useGlobalInterceptors(new ErrorInterceptor()); // Then error handling
  const reflector = new Reflector();
  app.useGlobalInterceptors(new ResponseInterceptor(reflector)); // Finally response formatting
  app.useGlobalFilters(new MsExceptionFilter());

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [rabbitmqUrl ?? 'amqp://localhost:5672'],
      queue: rabbitmqQueue ?? 'USER_QUEUE',
      queueOptions: { durable: true },
      prefetchCount: Number(config.get('RABBITMQ_PREFETCH')) || 1,
    },
  });

  try {
    await app.startAllMicroservices();
    Logger.log('✅ User RMQ Worker running successfully!');
  } catch (error) {
    Logger.error('❌ Failed to start microservices:', error);
    throw error;
  }
}

bootstrap().catch((err) => {
  Logger.error('Failed to start application:', err);
  process.exit(1);
});
