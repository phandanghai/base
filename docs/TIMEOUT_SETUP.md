# Gateway Timeout Configuration

## Overview

Gateway được cấu hình với multiple timeout strategies để handle request timeouts ở different levels.

## Timeout Strategies

### 1. Global Timeout (Application Level)
- **Location**: `main.ts`
- **Scope**: Tất cả requests
- **Default**: 10 seconds
- **Configuration**: Environment variable `GLOBAL_TIMEOUT`

```typescript
// main.ts
app.useGlobalInterceptors(new TimeoutInterceptor(globalTimeout));
```

### 2. Controller Level Timeout
- **Location**: Individual controllers
- **Scope**: Specific endpoints
- **Usage**: `@Timeout(ms)` decorator

```typescript
@Get()
@Timeout(3000) // 3 seconds timeout
getHello(): Observable<string> {
  // Implementation
}
```

### 3. Method Level Timeout
- **Location**: Inside method implementation
- **Scope**: Specific operations
- **Usage**: RxJS `timeout()` operator

```typescript
return of('data').pipe(
  timeout(5000), // 5 seconds timeout
  catchError(handleTimeout)
);
```

## Implementation Examples

### Basic Timeout Setup
```typescript
// app.controller.ts
@Get()
@Timeout(3000) // Will timeout after 3 seconds
getHello(): Observable<string> {
  return of('Hello World!').pipe(
    delay(4000), // Simulates 4s processing - will timeout
  );
}
```

### Custom Timeout Handling
```typescript
@Get('custom')
@Timeout(2000)
getCustom(): Observable<string> {
  return this.processData().pipe(
    catchError((error) => {
      if (error instanceof RequestTimeoutException) {
        this.logger.error('Custom timeout handling');
        return throwError(() => new BadRequestException('Custom timeout message'));
      }
      return throwError(() => error);
    })
  );
}
```

### Different Timeouts for Different Endpoints
```typescript
@Get('fast')
@Timeout(1000) // 1 second for fast operations
getFast(): Observable<string> { /* ... */ }

@Get('slow')
@Timeout(30000) // 30 seconds for slow operations  
getSlow(): Observable<string> { /* ... */ }
```

## Configuration

### Environment Variables
```bash
# .env
GLOBAL_TIMEOUT=10000  # 10 seconds global timeout
PORT=8888
RABBITMQ_URL=amqp://localhost:5672
```

### Timeout Hierarchy
1. **Method-level timeout** (highest priority)
2. **Controller-level timeout** (`@Timeout` decorator)
3. **Global timeout** (fallback)

## Error Handling

### Timeout Errors
- **TimeoutError**: From RxJS timeout operator
- **RequestTimeoutException**: From NestJS (408 status)

### Error Flow
```
Request → Timeout Interceptor → Controller → Method
                ↓ (timeout)
RequestTimeoutException → Exception Filter → 408 Response
```

### Response Format
```json
{
  "statusCode": 408,
  "message": "Request timeout",
  "path": "/api/endpoint",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Testing Timeout

### Test Endpoints
```bash
# Fast response (within timeout)
GET /fast

# Slow response (will timeout)  
GET /slow

# Default endpoint with timeout
GET /
```

### Expected Responses
```bash
# Success (within timeout)
HTTP 200 OK
{
  "statusCode": 200,
  "message": "Get fast response",
  "response": "Fast response!",
  "timestamp": 1234567890
}

# Timeout
HTTP 408 Request Timeout
{
  "statusCode": 408,
  "message": "Request timeout",
  "path": "/slow",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## Best Practices

1. **Set appropriate timeouts** based on operation complexity
2. **Use shorter timeouts** for simple operations
3. **Use longer timeouts** for complex processing or external API calls
4. **Log timeout events** for monitoring
5. **Provide meaningful error messages** to clients
6. **Consider retry mechanisms** for transient failures

## Monitoring

### Logs
```
[LOG] Processing getHello request with 3s timeout...
[ERROR] Request timed out after 3 seconds
[WARN] HTTP Exception: GET / - 408 - Request timeout
```

### Metrics to Track
- Timeout frequency per endpoint
- Average response times
- Timeout threshold effectiveness
- Client retry patterns