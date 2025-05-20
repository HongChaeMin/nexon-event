import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ContextMember = createParamDecorator(
  (_, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();
    return request.member;
  },
);
