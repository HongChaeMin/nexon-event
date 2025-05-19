import { IsNotEmpty } from 'class-validator';

export class LoginMemberRequest {
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
