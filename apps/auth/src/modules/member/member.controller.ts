import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { ObjectId } from 'typeorm';
import { MemberService } from './member.service';
import { CreateMemberRequest } from './dto';

@Controller()
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @MessagePattern({ cmd: 'create' })
  create(@Payload() request: CreateMemberRequest) {
    return this.memberService.create(request);
  }

  @MessagePattern({ cmd: 'findAll' })
  findAll() {
    return this.memberService.findAll();
  }

  @MessagePattern({ cmd: 'findOne' })
  findOne(@Payload() id: ObjectId) {
    return this.memberService.findOne(id);
  }

  @MessagePattern({ cmd: 'update' })
  update(
    @Payload() { id, request }: { id: ObjectId; request: CreateMemberRequest },
  ) {
    return this.memberService.update(id, request);
  }

  @MessagePattern({ cmd: 'delete' })
  delete(@Payload() id: ObjectId) {
    return this.memberService.delete(id);
  }
}
