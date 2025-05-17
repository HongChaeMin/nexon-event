import { Column, Entity } from 'typeorm';
import { BaseEntity } from '../../../database/entities/base.entity';
import { RoleType } from '../types/role.type';

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
}
