import { BaseEntity } from '@repo/global-util';
import { Column, Entity } from 'typeorm';
import { CreateMemberRequest, RoleType, UpdateMemberRequest } from '@repo-types/auth';
import * as bcrypt from 'bcrypt';

@Entity()
export class Member extends BaseEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ unique: true, nullable: false })
  email: string;

  @Column({ nullable: false })
  password: string;

  @Column({ type: 'enum', enum: RoleType })
  role: RoleType;

  static async of(request: CreateMemberRequest) {
    const member = new Member();
    member.name = request.name;
    member.email = request.email;
    member.password = await bcrypt.hash(request.password, 10);
    member.role = request.role;
    return member;
  }

  update(request: UpdateMemberRequest) {
    this.name = request.name;
    this.email = request.email;
  }

  checkPassword(password: string) {
  return bcrypt.compareSync(password, this.password);
  }

  hasRole(roles: RoleType[]) {
    return roles.includes(this.role);
  }
}
