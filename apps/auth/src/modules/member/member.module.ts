import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { JwtConfig } from '@repo-types/auth';
import { Member } from './entities/member.entity';
import { MemberController } from './member.controller';
import { MemberService } from './member.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Member]),
    JwtModule.register(JwtConfig),
  ],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}
