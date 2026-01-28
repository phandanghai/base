# Base Microservice - Tài liệu Source Code

## Tổng quan dự án

**Base Microservice** là một monorepo được xây dựng với NestJS, sử dụng kiến trúc microservice với shared libraries. Dự án được tổ chức theo mô hình workspace với pnpm để quản lý dependencies và build process.

## Cấu trúc dự án

```
base_microservice/
├── apps/                     # Applications
│   ├── api/                  # API Application (NestJS)
│   └── prisma/               # Database schema
├── packages/                 # Shared Libraries
│   └── src/                  # Shared source code
│       ├── common/           # Common utilities
│       ├── core/             # Core business logic
│       └── infra/            # Infrastructure components
├── node_modules/             # Root dependencies
├── .gitlab-ci.yml           # CI/CD pipeline
├── package.json             # Root package configuration
├── pnpm-workspace.yaml      # Workspace configuration
└── tsconfig.base.json       # Base TypeScript configuration
```

---

## 📁 Root Level Files

### `package.json`

**Chức năng**: Root package configuration cho monorepo

- **Name**: `base_microservice`
- **Type**: Private monorepo
- **Scripts chính**:
  - `build`: Build toàn bộ project (shared + api)
  - `dev`: Chạy development mode
  - `lint`: ESLint cho toàn bộ codebase
  - `test`: Jest testing
- **Dependencies**: Shared dependencies cho toàn bộ workspace
- **DevDependencies**: Development tools (ESLint, Prettier, Jest, TypeScript)

### `pnpm-workspace.yaml`

**Chức năng**: Cấu hình pnpm workspace

```yaml
packages:
  - 'apps/*' # Tất cả apps
  - 'packages' # Shared package
```

### `tsconfig.base.json`

**Chức năng**: Base TypeScript configuration cho toàn bộ project

- **Target**: ES2020
- **Module**: CommonJS
- **Strict mode**: Enabled
- **Path mapping**: `@base/shared` → `packages/src/index`
- **Decorators**: Enabled cho NestJS

### `.gitignore`

**Chức năng**: Git ignore rules

- Ignore: `dist/`, `node_modules/`, `.env`, build artifacts
- Keep: VSCode settings, launch configurations

### `.gitlab-ci.yml`

**Chức năng**: GitLab CI/CD pipeline

- **Stages**: prepare → lint → test → build → release → deploy
- **Features**:
  - pnpm caching
  - Workspace-aware builds
  - Railway deployment
  - Manual release process

### `eslint.config.mjs`

**Chức năng**: ESLint configuration (flat config)

- **Extends**: TypeScript ESLint recommended + type-checked
- **Rules**: Strict TypeScript rules, NestJS-friendly
- **Ignores**: dist, node_modules, coverage

### `jest.config.js`

**Chức năng**: Jest testing configuration

- **Test pattern**: `{apps,packages}/**/*.(spec|test).ts`
- **Environment**: Node.js
- **Coverage**: Collect from all TypeScript files

---

## 📁 Apps Directory

### `apps/api/` - API Application

#### `apps/api/package.json`

**Chức năng**: API application package configuration

- **Name**: `@base/api`
- **Dependencies**:
  - `@base/shared`: Workspace dependency
  - NestJS core packages
  - Authentication (passport-jwt)
- **Scripts**:
  - `dev`: Development với ts-node
  - `build`: NestJS build
  - `start:prod`: Production start

#### `apps/api/src/main.ts`

**Chức năng**: Application entry point và bootstrap

- **Features**:
  - NestJS application factory
  - Global interceptors setup (Timeout, Error, Response)
  - Global filters (MsExceptionFilter)
  - RabbitMQ microservice connections
  - Development/Production mode handling
  - Graceful error handling

**Key Components**:

```typescript
// Global interceptors (order matters)
app.useGlobalInterceptors(new TimeoutInterceptor(globalTimeout));
app.useGlobalInterceptors(new ErrorInterceptor());
app.useGlobalInterceptors(new ResponseInterceptor(reflector));
app.useGlobalFilters(new MsExceptionFilter());

// RabbitMQ connections
app.connectMicroservice({
  transport: Transport.RMQ,
  options: {
    urls: [rabbitmqUrl],
    queue: 'REDIS_QUEUE',
    queueOptions: { durable: true },
  },
});
```

#### `apps/api/src/app.module.ts`

**Chức năng**: Root application module

- **Imports**: ConfigModule (global)
- **Controllers**: AppController
- **Providers**: AppService

#### `apps/api/src/app.controller.ts`

**Chức năng**: Basic application controller

- **Route**: `GET /` → "Hello World!"

#### `apps/api/src/app.service.ts`

**Chức năng**: Basic application service

- **Method**: `getHello()` → returns greeting

### `apps/prisma/schema.prisma`

**Chức năng**: Database schema definition (Prisma ORM)

---

## 📁 Packages Directory - Shared Library

### `packages/package.json`

**Chức năng**: Shared library package configuration

- **Name**: `@base/shared`
- **Main**: `src/index.ts` (direct source import)
- **Types**: `src/index.ts`
- **Dependencies**: NestJS, RabbitMQ, bcrypt, zod, passport-jwt

### `packages/src/index.ts`

**Chức năng**: Main export file cho shared library

```typescript
export * from './core'; // Business logic
export * from './common'; // Utilities
export * from './infra'; // Infrastructure
```

---

## 📁 Common Directory - Utilities & Helpers

### `packages/src/common/index.ts`

**Chức năng**: Export tất cả common utilities

```typescript
export * from './decorator'; // Custom decorators
export * from './helper'; // Helper functions
export * from './interceptor'; // NestJS interceptors
export * from './ms_filter'; // Microservice filters
export * from './pipe'; // Validation pipes
```

### Decorators (`packages/src/common/decorator/`)

#### `public.decorator.ts`

**Chức năng**: Decorator để mark routes là public (bypass authentication)

```typescript
export const IS_PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(IS_PUBLIC_KEY, true);
```

#### `response.decorator.ts`

**Chức năng**: Decorators cho response formatting

- `@ResponseMessage()`: Set custom response message
- `@StatusCode()`: Set custom status code

#### `timeout.decorator.ts`

**Chức năng**: Decorator để set custom timeout cho routes

```typescript
export const Timeout = (ms: number) => SetMetadata(TIMEOUT_KEY, ms);
```

#### `user.decorator.ts`

**Chức năng**: Decorator để extract user từ request

```typescript
export const User = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
```

### Interceptors (`packages/src/common/interceptor/`)

#### `errors.interceptor.ts`

**Chức năng**: Global error handling interceptor

- **Handles**:
  - ZodError (validation errors)
  - TimeoutError
  - RpcException (microservice errors)
  - HttpException
- **Features**: Structured error logging

#### `timeout.interceptor.ts`

**Chức năng**: Request timeout interceptor

- **Default**: 5000ms timeout
- **Configurable**: Constructor parameter
- **Error**: Throws GatewayTimeoutException on timeout

#### `response.interceptor.ts`

**Chức năng**: Response formatting interceptor

- **Features**:
  - Standardized response format
  - Custom messages via @ResponseMessage
  - Status code handling
  - Metadata extraction

#### `logger.interceptor.ts`

**Chức năng**: Request/response logging interceptor

- **Logs**: Request details, response time, status codes

### Helpers (`packages/src/common/helper/`)

#### `circuit_breaker.helper.ts`

**Chức năng**: Circuit breaker pattern implementation

```typescript
class CircuitBreaker {
  private failureCount = 0;
  private open = false;

  async exec<T>(fn: () => Promise<T>): Promise<T>;
}
```

- **Features**: Failure threshold, auto-reset, error tracking

#### `retry.helper.ts`

**Chức năng**: Retry mechanism với exponential backoff

#### `hashing.helper.ts`

**Chức năng**: Password hashing utilities (bcrypt)

#### `rabbit.pattern.helper.ts`

**Chức năng**: RabbitMQ pattern definition helpers

#### `normalize_rpc_exception.helper.ts`

**Chức năng**: RPC exception normalization

### Filters (`packages/src/common/ms_filter/`)

#### `msFilter.exception.ts`

**Chức năng**: Microservice exception filter

- **Handles**: RPC exceptions, timeout errors
- **Features**: Error normalization, logging

### Pipes (`packages/src/common/pipe/`)

#### `zod-validation.pipe.ts`

**Chức năng**: Zod schema validation pipe

- **Features**: Schema-based validation, detailed error messages

---

## 📁 Core Directory - Business Logic

### `packages/src/core/index.ts`

**Chức năng**: Export core business components

```typescript
export * from './constant'; // Application constants
export * from './enum'; // Enumerations
export * from './interface'; // Type definitions
export * from './schema'; // Validation schemas
```

### Constants (`packages/src/core/constant/`)

#### `rabbitmq.pattern.ts`

**Chức năng**: RabbitMQ message patterns definition

- **Patterns**: User operations, auth operations
- **Structure**: Organized by domain

#### `rabbitmq.queue.ts`

**Chức năng**: RabbitMQ queue names

- **Queues**: USER_QUEUE, REDIS_QUEUE, etc.

### Enums (`packages/src/core/enum/`)

#### `enum.ts`

**Chức năng**: Application-wide enumerations

- **Examples**: UserRole, Status, etc.

### Interfaces (`packages/src/core/interface/`)

#### `common.interface.ts`

**Chức năng**: Common type definitions

- **JwtPayload**: JWT token structure
- **RequestContext**: Request metadata

#### `rabbitmq.interface.ts`

**Chức năng**: RabbitMQ-related interfaces

- **Message structures**, **Queue configurations**

#### `model.interface.ts`

**Chức năng**: Domain model interfaces

- **User**, **Auth** models

### Schemas (`packages/src/core/schema/`)

#### `user.schema.ts`

**Chức năng**: User validation schemas (Zod)

```typescript
export const UserDto = z.object({
  id: z.string(),
  email: z.string().email(),
  username: z.string().min(3),
});
```

#### `auth.schema.ts`

**Chức năng**: Authentication schemas

- **LoginDto**, **RegisterDto**, **TokenDto**

#### `common.schema.ts`

**Chức năng**: Common validation schemas

- **PaginationDto**, **ResponseDto**

---

## 📁 Infra Directory - Infrastructure

### `packages/src/infra/index.ts`

**Chức năng**: Export infrastructure components

```typescript
export * from './guard'; // Authentication guards
export * from './rabbitmq'; // RabbitMQ infrastructure
export * from './strategy'; // Passport strategies
```

### Guards (`packages/src/infra/guard/`)

#### `jwt-auth.guard.ts`

**Chức năng**: JWT authentication guard

- **Features**:
  - Public route detection (@Public decorator)
  - JWT token validation
  - User extraction
  - Detailed logging

### RabbitMQ (`packages/src/infra/rabbitmq/`)

#### `rabbitmq.module.ts`

**Chức năng**: RabbitMQ NestJS module

- **Providers**: RabbitMQ service, connection providers
- **Exports**: RabbitMQ service

#### `rabbitmq.service.ts`

**Chức năng**: RabbitMQ service implementation

- **Features**:
  - Connection management
  - Circuit breaker integration
  - Message publishing
  - Queue management

#### `rabbitmq.config.ts`

**Chức năng**: RabbitMQ configuration factory

- **Creates**: Connection options từ environment variables

#### `rabbitmq.provider.ts`

**Chức năng**: RabbitMQ providers for dependency injection

#### `rabbitmq.token.ts`

**Chức năng**: Injection tokens for RabbitMQ services

### Strategies (`packages/src/infra/strategy/`)

#### `jwt.strategy.ts`

**Chức năng**: Passport JWT strategy

- **Features**:
  - JWT token validation
  - User payload extraction
  - Integration với NestJS auth system

---

## 🔧 Development Workflow

### Build Process

1. **Install**: `pnpm install` (workspace-aware)
2. **Build Shared**: `pnpm run build:shared`
3. **Build API**: `pnpm run build:api`
4. **Development**: `pnpm run dev`

### Path Mapping

- `@base/shared` → `packages/src/index`
- Direct source imports (no build required in development)
- TypeScript path resolution via `tsconfig-paths`

### Testing Strategy

- **Unit tests**: Jest configuration
- **Integration tests**: Supertest for API
- **Coverage**: Collected from all TypeScript files

### CI/CD Pipeline

1. **Prepare**: Install dependencies, cache setup
2. **Lint**: ESLint validation
3. **Test**: Jest test execution
4. **Build**: Shared library + API build
5. **Release**: Tag-based releases
6. **Deploy**: Railway deployment (manual)

---

## 🚀 Key Features

### Microservice Architecture

- **RabbitMQ**: Message queue communication
- **Circuit Breaker**: Fault tolerance
- **Timeout Handling**: Request timeout management
- **Error Normalization**: Consistent error handling

### Security

- **JWT Authentication**: Passport-based
- **Password Hashing**: bcrypt
- **Public Routes**: @Public decorator
- **Request Validation**: Zod schemas

### Development Experience

- **Hot Reload**: ts-node development
- **Path Mapping**: Clean imports
- **Monorepo**: Shared code reuse
- **Type Safety**: Full TypeScript coverage

### Production Ready

- **Error Handling**: Comprehensive error management
- **Logging**: Structured logging
- **Configuration**: Environment-based config
- **Health Checks**: Application monitoring

---

## 📋 Usage Examples

### Import từ Shared Library

```typescript
// Interceptors
import { ErrorInterceptor, TimeoutInterceptor } from '@base/shared';

// Guards
import { JwtAuthGuard } from '@base/shared';

// Schemas
import { UserDto } from '@base/shared';

// Decorators
import { Public, User } from '@base/shared';
```

### Controller với Authentication

```typescript
@Controller('users')
@UseGuards(JwtAuthGuard)
export class UserController {
  @Get('profile')
  getProfile(@User() user: JwtPayload) {
    return user;
  }

  @Post('public-endpoint')
  @Public()
  publicEndpoint() {
    return 'No auth required';
  }
}
```

### RabbitMQ Usage

```typescript
@Injectable()
export class UserService {
  constructor(private rabbitmq: RabbitMQService) {}

  async createUser(userData: UserDto) {
    await this.rabbitmq.publish('user.created', userData);
  }
}
```

---

Tài liệu này cung cấp cái nhìn tổng quan về toàn bộ source code của dự án Base Microservice, từ cấu trúc tổng thể đến chi tiết từng file và chức năng của chúng.
