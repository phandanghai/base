# Base Microservice - Monorepo

Đây là một monorepo được tái cấu trúc theo kiến trúc microservice với NestJS và shared libraries.

## Cấu trúc Project

```
base_microservice/
├─ apps/
│  └─ api/                    # API Application
│     ├─ src/
│     │  ├─ main.ts
│     │  ├─ app.module.ts
│     │  ├─ modules/
│     │  │  └─ user/          # User module
│     │  │     ├─ user.controller.ts
│     │  │     ├─ user.service.ts
│     │  │     ├─ user.module.ts
│     │  │     └─ dto/
│     │  └─ config/
│     └─ prisma/
│        └─ schema.prisma
├─ packages/
│  └─ shared/                 # Shared library
│     ├─ src/
│     │  ├─ core/            # Core business logic
│     │  ├─ common/          # Common utilities
│     │  ├─ infra/           # Infrastructure components
│     │  └─ index.ts
│     └─ package.json
├─ .gitlab-ci.yml
├─ tsconfig.base.json
├─ pnpm-workspace.yaml
└─ package.json
```

## Cài đặt

```bash
# Cài đặt dependencies
pnpm install

# Build shared library
pnpm run build:shared

# Build API
pnpm run build:api

# Build tất cả
pnpm run build
```

## Development

```bash
# Chạy API trong development mode
pnpm run dev

# Hoặc chạy từ thư mục apps/api
cd apps/api
pnpm run start:dev
```

## Scripts

- `pnpm run build` - Build toàn bộ project
- `pnpm run build:shared` - Build shared library
- `pnpm run build:api` - Build API application
- `pnpm run dev` - Chạy API trong development mode
- `pnpm run lint` - Lint code
- `pnpm run format` - Format code

## Shared Library

Shared library chứa các components dùng chung:

- **Core**: Business logic và domain entities
- **Common**: Utilities, helpers, decorators, pipes
- **Infra**: Infrastructure components (RabbitMQ, guards, interceptors)

### Import từ Shared Library

```typescript
// Import từ shared library
import { UserService, RabbitMQModule } from '@shared';

// Import schemas
import { Schemas } from '@shared';
const userSchema = Schemas.UserSchema;
```

## Monorepo Structure

Project sử dụng pnpm workspace để quản lý monorepo:

- `apps/*` - Applications
- `packages/*` - Shared libraries
- TypeScript project references để tối ưu build time
- Path mapping để import dễ dàng

## Migration từ cấu trúc cũ

Các thay đổi chính:

1. **Shared code** được di chuyển từ `src/shared/` sang `packages/shared/src/`
2. **Application code** được di chuyển từ `src/` sang `apps/api/src/`
3. **Import paths** được cập nhật để sử dụng `@shared` alias
4. **Build system** được cấu hình để hỗ trợ monorepo

## Lưu ý

- Luôn build shared library trước khi build applications
- Sử dụng `@shared` alias để import từ shared library
- Schemas được export dưới namespace `Schemas` để tránh conflict
