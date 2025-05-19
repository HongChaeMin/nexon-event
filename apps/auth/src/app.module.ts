import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeOrmConfigProvider } from '@repo/global-util';
import { MemberModule } from './modules/member/member.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(TypeOrmConfigProvider.forRoot()),
    MemberModule,
  ],
})
export class AppModule {}
