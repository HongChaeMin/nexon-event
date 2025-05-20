import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';
import { Member } from './entities/member.entity';
import { MemberException } from './errors/member.exception';
import {
  CreateMemberRequest,
  LoginMemberRequest,
  LoginMemberResponse,
  MemberResponse, RoleType,
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
    const result = await this.memberRepository.save(member);
    return MemberResponse.of(result);
  }

  async login(request: LoginMemberRequest) {
    const options = request.getOptions();
    const member = await this.memberRepository.findOne(options);
    if (!member) throw MemberException.INVALID_EMAIL;
    if (!member.checkPassword(request.password))
      throw MemberException.INVALID_PASSWORD;
    const token = this.jwtService.sign({ id: member._id });
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

  async validateRole(request: { id: string; roles: RoleType[] }) {
    const _id = new ObjectId(request.id);
    const member = await this.memberRepository.findOne({ where: { _id } });
    if (!member) throw MemberException.NOT_FOUND;
    if (!member.hasRole(request.roles)) throw MemberException.INVALID_ROLE;
    return { member: MemberResponse.of(member) };
  }

  async findAll() {
    const members = await this.memberRepository.find();
    return members.map(MemberResponse.of);
  }

  async findOne(id: string) {
    const _id = new ObjectId(id);
    const member = await this.memberRepository.findOne({ where: { _id } });
    if (!member) throw MemberException.NOT_FOUND;
    return MemberResponse.of(member);
  }

  async update(id: string, request: UpdateMemberRequest) {
    const _id = new ObjectId(id);
    const member = await this.memberRepository.findOne({ where: { _id } });
    if (!member) throw MemberException.NOT_FOUND;
    member.update(request);
    const result = await this.memberRepository.save(member);
    return MemberResponse.of(result);
  }

  async delete(id: string) {
    const _id = new ObjectId(id);
    return await this.memberRepository.delete(_id);
  }
}
