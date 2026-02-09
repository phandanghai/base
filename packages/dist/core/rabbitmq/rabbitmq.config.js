"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createRmqOptions = exports.RMQ_SERVICES = void 0;
const microservices_1 = require("@nestjs/microservices");
exports.RMQ_SERVICES = [
    { name: 'USER_SERVICE', queue: 'USER_QUEUE', prefetchCount: 10 },
    { name: 'AUTH_SERVICE', queue: 'AUTH_QUEUE', prefetchCount: 5 },
    { name: 'REDIS_SERVICE', queue: 'REDIS_QUEUE', prefetchCount: 15 },
    { name: 'MAILER_SERVICE', queue: 'MAILER_QUEUE', prefetchCount: 15 },
];
const createRmqOptions = (configService, serviceName) => {
    const service = exports.RMQ_SERVICES.find((s) => s.name === serviceName);
    if (!service) {
        throw new Error(`RMQ service config not found: ${serviceName}`);
    }
    return {
        transport: microservices_1.Transport.RMQ,
        options: {
            urls: [configService.get('RABBITMQ_URL') ?? 'amqp://localhost:5672'],
            queue: service.queue,
            queueOptions: { durable: true },
            prefetchCount: service.prefetchCount ?? 10,
        },
    };
};
exports.createRmqOptions = createRmqOptions;
//# sourceMappingURL=rabbitmq.config.js.map