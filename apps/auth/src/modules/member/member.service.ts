import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ObjectId, Repository } from 'typeorm';
import { Member } from './entities/member.entity';
import { MemberException } from './errors/member.exception';
import {
  CreateMemberRequest,
  LoginMemberRequest,
  LoginMemberResponse,
  MemberResponse,
  UpdateMemberRequest,
} from '@repo-types/auth';

@Injectable()
export class MemberService {
  constructor(
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,

    private readonly jwtService :JwtService,
  ) {}

  async create(request: CreateMemberRequest) {
    const member = await Member.of(request);
    return await this.memberRepository.save(member);
  }

  async login(request: LoginMemberRequest) {
    const member = await this.memberRepository.findOne({
      where: { email: request.email },
    });
    if (!member) throw MemberException.INVALID_EMAIL;
    if (!member.checkPassword(request.password))
      throw MemberException.INVALID_PASSWORD;
    const token = this.jwtService.sign({ id: member.id });
    return LoginMemberResponse.of(member, token);
  }

  async validateToken(token: string) {
    try {
      this.jwtService.verify(token);
    } catch (error) {
      throw MemberException.TOKEN_INVALID;
    }
    return this.jwtService.decode(token) as { id: number };
  }

  async findAll() {
    const members = await this.memberRepository.find();
    return members.map(MemberResponse.of);
  }

  async findOne(id: ObjectId) {
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) throw MemberException.NOT_FOUND;
    return MemberResponse.of(member);
  }

  async update(id: ObjectId, request: UpdateMemberRequest) {
    const member = await this.memberRepository.findOne({ where: { id } });
    if (!member) throw MemberException.NOT_FOUND;
    member.update(request);
    const result = await this.memberRepository.save(member);
    return MemberResponse.of(result);
  }

  async delete(id: ObjectId) {
    return await this.memberRepository.delete(id);
  }
}
