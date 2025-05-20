import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { MemberService } from './services/member.service';
import {
  CreateMemberRequest,
  LoginMemberRequest,
  MemberResponse,
  RoleType,
  UpdateMemberRequest,
} from '@repo-types/auth';
import { Auth } from '../common/auth/decorators/auth.decorator';
import { ContextMember } from '../common/auth/decorators/context.member';

@Controller('members')
export class AuthController {
  constructor(private authService: MemberService) {}

  @Post()
  create(@Body() request: CreateMemberRequest) {
    return this.authService.create(request);
  }

  @Auth([RoleType.USER])
  @Get()
  findAll(@ContextMember() member: MemberResponse) {
    console.log('member', member);
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() request: UpdateMemberRequest,
  ) {
    return this.authService.update(id, request);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.authService.delete(id);
  }

  @Post('login')
  login(@Body() request: LoginMemberRequest) {
    return this.authService.login(request);
  }
}
