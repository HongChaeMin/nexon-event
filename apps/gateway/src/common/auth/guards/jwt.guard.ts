import { CanActivate, ExecutionContext, Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { MemberPatterns } from '@repo-types/auth';
import { firstValueFrom } from 'rxjs';
import { GatewayException } from '../../exception/gateway.exception';

@Injectable()
export class JwtGuard implements CanActivate {
  constructor(
    @Inject('AUTH_SERVICE')
    private readonly authClient: ClientProxy,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = request.headers.authorization?.split('Bearer ')[1];
    if (!token) throw GatewayException.TOKEN_NOT_FOUND;
    const claims = await firstValueFrom(
      this.authClient.send(MemberPatterns.VALIDATE_TOKEN, { token })
    );
    request.id = claims.id;
    return true;
  }
}
