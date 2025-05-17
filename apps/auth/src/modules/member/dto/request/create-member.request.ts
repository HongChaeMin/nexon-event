import { IsEnum, IsNotEmpty } from 'class-validator';
import { RoleType } from '../../types/role.type';

export class CreateMemberRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  @IsEnum(RoleType)
  role: RoleType;
}
