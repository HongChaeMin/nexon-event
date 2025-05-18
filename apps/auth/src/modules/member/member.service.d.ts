import { ObjectId, Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { CreateMemberRequest } from './dto';
export declare class MemberService {
    private readonly memberRepository;
    constructor(memberRepository: Repository<Member>);
    create(request: CreateMemberRequest): Promise<Member>;
    findAll(): Promise<Member[]>;
    findOne(id: ObjectId): Promise<Member | null>;
    update(id: ObjectId, request: CreateMemberRequest): Promise<import("typeorm").UpdateResult>;
    delete(id: ObjectId): Promise<import("typeorm").DeleteResult>;
}
