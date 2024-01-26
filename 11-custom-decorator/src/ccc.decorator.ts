import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';

export const Ccc = createParamDecorator(
  (data: string, context: ExecutionContext) => {
    return 'ccc';
  },
);

export const MyHeader = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();

    return key ? request.headers[key.toLowerCase()] : request.headers;
  },
);

export const MyQuery = createParamDecorator(
  (key: string, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();

    return key ? request.query[key] : request.query;
  },
);
