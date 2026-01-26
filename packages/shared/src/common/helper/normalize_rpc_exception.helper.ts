import { RpcException } from "@nestjs/microservices";

export const normalizeRpcException = (exception: RpcException) => {
  if (exception && exception instanceof RpcException) {
    const error = exception.getError();
    
    if (error && typeof error === 'object') {
      const errorObj = error as Record<string, unknown>;
      return {
        ...errorObj,
        message: exception.message ?? (typeof errorObj.message === 'string' ? errorObj.message : 'Unknown error'),
      };
    }
  }

  return null;
}
