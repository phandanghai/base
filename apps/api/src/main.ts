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

  const globalTimeout = config.get<number>('GLOBAL_TIMEOUT') ?? 10000;
  const port = config.get<string | number>('PORT') ?? 8888;

  // Setup global interceptors and filters
  app.useGlobalInterceptors(new TimeoutInterceptor(globalTimeout));
  app.useGlobalInterceptors(new ErrorInterceptor());
  const reflector = new Reflector();
  app.useGlobalInterceptors(new ResponseInterceptor(reflector));
  app.useGlobalFilters(new MsExceptionFilter());

  // Enable CORS if needed
  app.enableCors();

  Logger.log('🚀 Starting API Gateway...');
  Logger.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
  Logger.log(`🌐 Port: ${port}`);

  // Gateway is HTTP server only - RabbitMQ clients are injected via modules
  await app.listen(port);
  Logger.log(`✅ API Gateway is ready on port ${port}!`);
}

bootstrap().catch((err) => {
  Logger.error('Failed to start application:', err);
  process.exit(1);
});
