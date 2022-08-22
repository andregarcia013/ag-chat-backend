import { ExecutionContext, createParamDecorator } from '@nestjs/common';

export const WsContext = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToWs();
    return request;
  },
);
