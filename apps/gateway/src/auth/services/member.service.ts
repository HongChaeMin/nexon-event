import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { CreateMemberRequest, LoginMemberRequest, MemberPatterns, UpdateMemberRequest } from '@repo-types/auth';

@Injectable()
export class MemberService {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authClient: ClientProxy,
  ) {}

  create(request: CreateMemberRequest) {
    return this.authClient.send(MemberPatterns.CREATE, request);
  }

  login(request: LoginMemberRequest) {
    return this.authClient.send(MemberPatterns.LOGIN, request);
  }

  findAll() {
    return this.authClient.send(MemberPatterns.FIND_ALL, {});
  }

  findOne(id: number) {
    return this.authClient.send(MemberPatterns.FIND_ONE, id);
  }

  update(id: number, request: UpdateMemberRequest) {
    return this.authClient.send(MemberPatterns.UPDATE, { id, request });
  }

  delete(id: number) {
    return this.authClient.send(MemberPatterns.DELETE, id);
  }
}
