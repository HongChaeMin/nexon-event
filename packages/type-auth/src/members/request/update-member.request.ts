import { IsNotEmpty } from 'class-validator';

export class UpdateMemberRequest {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  email: string;
}
