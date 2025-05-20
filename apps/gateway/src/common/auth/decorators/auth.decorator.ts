import { applyDecorators, SetMetadata, UseGuards } from '@nestjs/common';
import { RoleType } from '@repo-types/auth';
import { JwtGuard } from '../guards/jwt.guard';
import { RoleGuard } from '../guards/role.guard';

export function Auth(roles: RoleType[]) {
  return applyDecorators(
    SetMetadata('roles', roles),
    UseGuards(JwtGuard, RoleGuard),
  );
}
