import { BusinessExceptionType, ValidateExceptionType } from './types';
import { HttpException, HttpStatus } from '@nestjs/common';

export class AuthException extends HttpException {
  constructor(
    errors: BusinessExceptionType[] | ValidateExceptionType[],
    httpStatus?: HttpStatus,
  ) {
    super({ errors }, httpStatus ? httpStatus : HttpStatus.BAD_REQUEST);
  }
}
