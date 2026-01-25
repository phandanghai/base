# Exception Filter

## Overview

Global exception filter xử lý tất cả exceptions trong ứng dụng và trả về consistent error responses.

## Exception Types Handled

### 1. Zod Validation Errors
- **Type**: `ZodError`
- **Status**: 400 Bad Request
- **Response**: Formatted validation errors với field paths

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "errors": [
    {
      "field": "email",
      "message": "Invalid email format",
      "code": "invalid_string"
    }
  ],
  "path": "/api/users",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 2. HTTP Exceptions
- **Type**: `HttpException` (từ NestJS)
- **Status**: Dynamic (từ exception)
- **Response**: Standard HTTP error format

```json
{
  "statusCode": 404,
  "message": "User not found",
  "path": "/api/users/123",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 3. Microservice Errors
- **Type**: `MsErrorPayload` structure
- **Status**: Dynamic (từ payload)
- **Response**: Microservice error với service info

```json
{
  "statusCode": 400,
  "message": "Validation failed",
  "service": "user-service",
  "source": "UserController.create",
  "type": "VALIDATION_ERROR",
  "path": "/api/users",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 4. Unknown Errors
- **Type**: Any other error
- **Status**: 500 Internal Server Error
- **Response**: Generic error message

```json
{
  "statusCode": 500,
  "message": "Internal server error",
  "path": "/api/users",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Usage

### Register Globally
```typescript
// main.ts
import { HttpExceptionFilter } from './filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());
  
  await app.listen(3000);
}
```

### Register in Module
```typescript
// app.module.ts
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filter';

@Module({
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
```

## Logging

Filter tự động log các errors với different levels:

- **WARN**: Validation errors, HTTP exceptions
- **ERROR**: Microservice errors, unexpected errors

```
[WARN] Validation Error: POST /api/users - [{"field":"email","message":"Invalid email"}]
[ERROR] Microservice Error: POST /api/users - 400 - Validation failed - Service: user-service
[ERROR] Unexpected Error: GET /api/users - Database connection failed
```

## Error Flow

```
Controller → Service → Exception
                         ↓
Exception Filter → Formatted Response
                         ↓
Client receives consistent error format
```

## MsErrorPayload Interface

```typescript
interface MsErrorPayload {
  statusCode?: number;
  message?: string;
  type?: string;
  service?: string;
  source?: string;
}
```

## Best Practices

1. **Consistent Format**: Tất cả errors có cùng structure
2. **Proper Logging**: Different log levels cho different error types
3. **Type Safety**: Proper TypeScript types và type guards
4. **Security**: Không expose sensitive information trong error messages
5. **Debugging**: Include timestamp và request path cho debugging