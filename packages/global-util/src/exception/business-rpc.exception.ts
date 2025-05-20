import { RpcException } from '@nestjs/microservices';
import { BusinessExceptionType } from './types/business-exception.type';

export class BusinessRpcException extends RpcException {
  constructor(
    error: BusinessExceptionType,
  ) {
    super(error);
  }
}

