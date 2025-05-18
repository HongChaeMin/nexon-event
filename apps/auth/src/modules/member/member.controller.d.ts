import { ObjectId } from 'typeorm';
import { MemberService } from './member.service';
import { CreateMemberRequest } from './dto';
export declare class MemberController {
    private readonly memberService;
    constructor(memberService: MemberService);
    create(request: CreateMemberRequest): Promise<import("./entities/member.entity").Member>;
    findAll(): Promise<import("./entities/member.entity").Member[]>;
    findOne(id: ObjectId): Promise<import("./entities/member.entity").Member | null>;
    update({ id, request }: {
        id: ObjectId;
        request: CreateMemberRequest;
    }): Promise<import("typeorm").UpdateResult>;
    delete(id: ObjectId): Promise<import("typeorm").DeleteResult>;
}
