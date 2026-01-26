export interface JwtPayload {
  id: string; // User ID
  email: string; // User email
  role?: string[]; // User roles (optional)
  iat?: number; // Issued at
  exp?: number; // Expiration time
}

export interface ResponseInterface<T> {
  statusCode: number;
  message: string;
  data: T;
  request: {
    method: string;
    url: string;
    route?: string;
    ip?: string;
    userAgent?: string;
  };
  timestamp: number;
}

export interface ErrorInterface<T> {
  statusCode: number;
  message: string;
  error: T;
  request: {
    method: string;
    url: string;
    route?: string;
    ip?: string;
    userAgent?: string;
  };
  timestamp: number;
}

export interface MsErrorPayload {
  statusCode?: number;
  message?: string;
  type?: string;
  service?: string;
  source?: string;
}

export interface RequestContext {
  ip: string;
  userAgent?: string;
  method: string;
  url: string;
  deviceId?: string;
  requestId?: string;
}

export interface RpcErrorPayload {
  statusCode?: number;
  message?: string;
  errorType?: string;
  source?: string;
  stack?: string;
}

export type ExtractPayload<T> = T extends { __payloadType?: infer P }
  ? P
  : never;

export type ExtractResponse<T> = T extends { __responseType?: infer R }
  ? R
  : never;
