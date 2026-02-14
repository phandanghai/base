import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import {
  ErrorInterceptor,
  TimeoutInterceptor,
  ResponseInterceptor,
  MsExceptionFilter,
} from '@base/shared';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);

  const rabbitmqUrl = config.get<string>('RABBITMQ_URL');
  const rabbitmqQueue = config.get<string>('RABBITMQ_QUEUE');
  const globalTimeout = config.get<number>('GLOBAL_TIMEOUT') ?? 10000; // 10 seconds default
  const port = config.get<string | number>('PORT') ?? 8888;

  // Setup global interceptors and filters
  app.useGlobalInterceptors(new TimeoutInterceptor(globalTimeout)); // Apply timeout first
  app.useGlobalInterceptors(new ErrorInterceptor()); // Then error handling
  const reflector = new Reflector();
  app.useGlobalInterceptors(new ResponseInterceptor(reflector)); // Finally response formatting
  app.useGlobalFilters(new MsExceptionFilter());

  // In development, make RabbitMQ optional
  if (process.env.NODE_ENV === 'development') {
    Logger.log('🚀 Starting in development mode...');

    // Start HTTP server first
    await app.listen(port);
    Logger.log(`🌐 HTTP Server running on port ${port}`);

    // Try to connect to RabbitMQ but don't fail if it's not available
    try {
      Logger.log(`🔗 Attempting to connect to RabbitMQ: ${rabbitmqUrl}`);

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

      app.connectMicroservice({
        transport: Transport.RMQ,
        options: {
          urls: [rabbitmqUrl ?? 'amqp://localhost:5672'],
          queue: rabbitmqQueue ?? 'USER_QUEUE',
          queueOptions: { durable: true },
          prefetchCount: Number(config.get('RABBITMQ_PREFETCH')) || 1,
        },
      });

      await app.startAllMicroservices();
      Logger.log('✅ RabbitMQ microservices started successfully!');
    } catch (error) {
      Logger.warn(
        '⚠️  RabbitMQ not available in development mode:',
        error instanceof Error ? error.message : String(error),
      );
      Logger.log('📝 HTTP API is still available for testing');
    }
  } else {
    // Production mode - RabbitMQ is required
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
      await app.listen(port);
      Logger.log('✅ Application started successfully!');
    } catch (error) {
      Logger.error('❌ Failed to start application:', error);
      throw error;
    }
  }
}

bootstrap().catch((err) => {
  Logger.error('Failed to start application:', err);
  process.exit(1);
});
