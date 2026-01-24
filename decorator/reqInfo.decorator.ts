// common/decorators/request-context.decorator.ts
import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import { Request } from "express";
import { RequestContext as ReqCtx } from "@/interface";

export const ReqContext = createParamDecorator(
  (_: unknown, ctx: ExecutionContext): ReqCtx => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return {
      ip:
        request.headers["x-forwarded-for"]?.toString() ??
        request.socket.remoteAddress ??
        "",
      userAgent: request.headers["user-agent"],
      method: request.method,
      url: request.originalUrl,
      requestId: request.headers["x-request-id"],
      deviceId: request.headers["deviceid"] as string,
    };
  },
);
