import { RoleType } from '../type/role.type';

export class MemberResponse {
  id: string;

  name: string;

  email: string;

  password: string;

  role: RoleType;

  createdAt: Date;

  updatedAt: Date;

  static of(member: any) {
    const response = new MemberResponse();
    response.id = member.id;
    response.name = member.name;
    response.email = member.email;
    response.password = member.password;
    response.role = member.role;
    response.createdAt = member.createdAt;
    response.updatedAt = member.updatedAt;
    return response;
  }
}
