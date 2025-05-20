import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { MemberPatterns, RoleType } from '@repo-types/auth';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientProxy,

    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const roles = this.reflector.get<RoleType[]>('roles', context.getHandler());
    const result = await firstValueFrom(
      this.authClient.send(
        MemberPatterns.VALIDATE_ROLE,
        { id: request.id, roles },
      )
    );
    request.member = result.member;
    return true;
  }
}

