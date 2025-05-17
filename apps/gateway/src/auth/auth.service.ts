import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMemberRequest } from './dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  create(request: CreateMemberRequest) {
    return this.authClient.send({ cmd: 'create' }, request);
  }

  findAll() {
    return this.authClient.send({ cmd: 'findAll' }, {});
  }
}
