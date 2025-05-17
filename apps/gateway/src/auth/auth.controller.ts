import { Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateMemberRequest } from './dto';

@Controller('auths')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post()
  create(request: CreateMemberRequest) {
    return this.authService.create(request);
  }

  @Get()
  findAll() {
    return this.authService.findAll();
  }
}
