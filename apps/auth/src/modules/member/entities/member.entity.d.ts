import { BaseEntity } from '../../../database/entities/base.entity';
import { RoleType } from '../types/role.type';
export declare class Member extends BaseEntity {
    name: string;
    email: string;
    password: string;
    role: RoleType;
}
