import { HttpException, HttpStatus } from '@nestjs/common';
import { BusinessExceptionType } from './types/business-exception.type';
import { ValidateExceptionType } from './types/validate-exception.type';

export class BusinessHttpException extends HttpException {
  constructor(
    errors: BusinessExceptionType[] | ValidateExceptionType[],
    httpStatus?: HttpStatus,
  ) {
    super({ errors }, httpStatus ? httpStatus : HttpStatus.BAD_REQUEST);
  }
}

