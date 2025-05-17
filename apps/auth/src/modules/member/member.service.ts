import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId, Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { CreateMemberRequest } from './dto';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
  ) {}

  create(request: CreateMemberRequest) {
    const member = this.memberRepository.create(request);
    return this.memberRepository.save(member);
  }

  findAll() {
    return this.memberRepository.find();
  }

  findOne(id: ObjectId) {
    return this.memberRepository.findOne({ where: { id } });
  }

  update(id: ObjectId, request: CreateMemberRequest) {
    return this.memberRepository.update(id, request);
  }

  delete(id: ObjectId) {
    return this.memberRepository.delete(id);
  }
}
