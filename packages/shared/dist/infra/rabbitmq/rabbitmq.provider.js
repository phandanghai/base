"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.rmqProviders = void 0;
const microservices_1 = require("@nestjs/microservices");
const config_1 = require("@nestjs/config");
const rabbitmq_config_1 = require("./rabbitmq.config");
const rabbitmq_token_1 = require("./rabbitmq.token");
exports.rmqProviders = [
    {
        provide: rabbitmq_token_1.RMQ_SERVICE.USER,
        useFactory: (config) => microservices_1.ClientProxyFactory.create((0, rabbitmq_config_1.createRmqOptions)(config, 'USER_SERVICE')),
        inject: [config_1.ConfigService],
    },
    {
        provide: rabbitmq_token_1.RMQ_SERVICE.AUTH,
        useFactory: (config) => microservices_1.ClientProxyFactory.create((0, rabbitmq_config_1.createRmqOptions)(config, 'AUTH_SERVICE')),
        inject: [config_1.ConfigService],
    },
    {
        provide: rabbitmq_token_1.RMQ_SERVICE.REDIS,
        useFactory: (config) => microservices_1.ClientProxyFactory.create((0, rabbitmq_config_1.createRmqOptions)(config, 'REDIS_SERVICE')),
        inject: [config_1.ConfigService],
    },
    {
        provide: rabbitmq_token_1.RMQ_SERVICE.MAILER,
        useFactory: (config) => microservices_1.ClientProxyFactory.create((0, rabbitmq_config_1.createRmqOptions)(config, 'MAILER_SERVICE')),
        inject: [config_1.ConfigService],
    },
];
//# sourceMappingURL=rabbitmq.provider.js.map