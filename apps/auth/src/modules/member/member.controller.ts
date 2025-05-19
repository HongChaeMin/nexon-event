import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ObjectId } from 'typeorm';
import { MemberService } from './member.service';
import {
  CreateMemberRequest,
  LoginMemberRequest,
  UpdateMemberRequest,
  MemberPatterns,
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
  async validateToken(@Payload() token: string) {
    return await this.memberService.validateToken(token);
  }

  @MessagePattern(MemberPatterns.FIND_ALL)
  async findAll() {
    return await this.memberService.findAll();
  }

  @MessagePattern(MemberPatterns.FIND_ONE)
  async findOne(@Payload() id: ObjectId) {
    return await this.memberService.findOne(id);
  }

  @MessagePattern(MemberPatterns.UPDATE)
  async update(
    @Payload() { id, request }: { id: ObjectId; request: UpdateMemberRequest },
  ) {
    return await this.memberService.update(id, request);
  }

  @MessagePattern(MemberPatterns.DELETE)
  async delete(@Payload() id: ObjectId) {
    return await this.memberService.delete(id);
  }
}
