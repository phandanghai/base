"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const microservices_1 = require("@nestjs/microservices");
const shared_1 = require("../../../packages/shared/dist/index");
const config_1 = require("@nestjs/config");
const common_1 = require("@nestjs/common");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const config = app.get(config_1.ConfigService);
    const rabbitmqUrl = config.get('RABBITMQ_URL');
    const rabbitmqQueue = config.get('RABBITMQ_QUEUE');
    const globalTimeout = config.get('GLOBAL_TIMEOUT') ?? 10000;
    const port = config.get('PORT') ?? 3000;
    app.useGlobalInterceptors(new shared_1.TimeoutInterceptor(globalTimeout));
    app.useGlobalInterceptors(new shared_1.ErrorInterceptor());
    const reflector = new core_1.Reflector();
    app.useGlobalInterceptors(new shared_1.ResponseInterceptor(reflector));
    app.useGlobalFilters(new shared_1.MsExceptionFilter());
    if (process.env.NODE_ENV === 'development') {
        common_1.Logger.log('🚀 Starting in development mode...');
        await app.listen(port);
        common_1.Logger.log(`🌐 HTTP Server running on port ${port}`);
        try {
            common_1.Logger.log(`🔗 Attempting to connect to RabbitMQ: ${rabbitmqUrl}`);
            app.connectMicroservice({
                transport: microservices_1.Transport.RMQ,
                options: {
                    urls: [rabbitmqUrl ?? 'amqp://localhost:5672'],
                    queue: rabbitmqQueue ?? 'REDIS_QUEUE',
                    queueOptions: { durable: true },
                    prefetchCount: Number(config.get('RABBITMQ_PREFETCH')) || 1,
                },
            });
            app.connectMicroservice({
                transport: microservices_1.Transport.RMQ,
                options: {
                    urls: [rabbitmqUrl ?? 'amqp://localhost:5672'],
                    queue: rabbitmqQueue ?? 'USER_QUEUE',
                    queueOptions: { durable: true },
                    prefetchCount: Number(config.get('RABBITMQ_PREFETCH')) || 1,
                },
            });
            await app.startAllMicroservices();
            common_1.Logger.log('✅ RabbitMQ microservices started successfully!');
        }
        catch (error) {
            common_1.Logger.warn('⚠️  RabbitMQ not available in development mode:', error instanceof Error ? error.message : String(error));
            common_1.Logger.log('📝 HTTP API is still available for testing');
        }
    }
    else {
        common_1.Logger.log(`🔗 Connecting to RabbitMQ: ${rabbitmqUrl}`);
        common_1.Logger.log(`📥 Listening on queue: ${rabbitmqQueue}`);
        app.connectMicroservice({
            transport: microservices_1.Transport.RMQ,
            options: {
                urls: [rabbitmqUrl ?? 'amqp://localhost:5672'],
                queue: rabbitmqQueue ?? 'REDIS_QUEUE',
                queueOptions: { durable: true },
                prefetchCount: Number(config.get('RABBITMQ_PREFETCH')) || 1,
            },
        });
        app.connectMicroservice({
            transport: microservices_1.Transport.RMQ,
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
            common_1.Logger.log('✅ Application started successfully!');
        }
        catch (error) {
            common_1.Logger.error('❌ Failed to start application:', error);
            throw error;
        }
    }
}
bootstrap().catch((err) => {
    common_1.Logger.error('Failed to start application:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map