import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { MemberService } from './member.service';
import {
  CreateMemberRequest,
  LoginMemberRequest,
  UpdateMemberRequest,
  MemberPatterns, RoleType,
} from '@repo-types/auth';

@Controller()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @MessagePattern(MemberPatterns.CREATE)
  async create(@Payload() request: CreateMemberRequest) {
    return await this.memberService.create(request);
  }

  @MessagePattern(MemberPatterns.LOGIN)
  async login(@Payload() request: LoginMemberRequest) {
    return await this.memberService.login(request);
  }

  @MessagePattern(MemberPatterns.VALIDATE_TOKEN)
  async validateToken(@Payload() request: { token: string }) {
    return await this.memberService.validateToken(request.token);
  }

  @MessagePattern(MemberPatterns.VALIDATE_ROLE)
  async validateRole(@Payload() request: { id: string; roles: RoleType[] }) {
    return await this.memberService.validateRole(request);
  }

  @MessagePattern(MemberPatterns.FIND)
  async findAll() {
    return await this.memberService.findAll();
  }

  @MessagePattern(MemberPatterns.FIND_ONE)
  async findOne(@Payload() id: string) {
    return await this.memberService.findOne(id);
  }

  @MessagePattern(MemberPatterns.UPDATE)
  async update(
    @Payload() { id, request }: { id: string; request: UpdateMemberRequest },
  ) {
    return await this.memberService.update(id, request);
  }

  @MessagePattern(MemberPatterns.DELETE)
  async delete(@Payload() id: string) {
    return await this.memberService.delete(id);
  }
}
