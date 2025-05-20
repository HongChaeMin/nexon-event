import { BusinessExceptionType, BusinessRpcException } from '@repo/global-util';
import { HttpStatus } from '@nestjs/common';

export class MemberException {
  static readonly NOT_FOUND = new BusinessRpcException(
    {
      code: 'member.find.not-found',
      message: '유저를 찾을 수 없습니다.',
      httpStatus: HttpStatus.NOT_FOUND,
    } as BusinessExceptionType,
  );

  static readonly INVALID_EMAIL = new BusinessRpcException(
    {
      code: 'member.login.invalid-email',
      message: '이메일 또는 비밀번호가 일치하지 않습니다.',
      httpStatus: HttpStatus.BAD_REQUEST,
    } as BusinessExceptionType,
  );

  static readonly INVALID_PASSWORD = new BusinessRpcException(
    {
      code: 'member.login.invalid-password',
      message: '이메일 또는 비밀번호가 일치하지 않습니다.',
      httpStatus: HttpStatus.BAD_REQUEST,
    } as BusinessExceptionType,
  );

  static readonly INVALID_ROLE = new BusinessRpcException(
    {
      code: 'member.validate-role.invalid-role',
      message: '권한이 없습니다.',
      httpStatus: HttpStatus.FORBIDDEN,
    } as BusinessExceptionType,
  );

  static readonly TOKEN_INVALID = new BusinessRpcException(
    {
      code: 'member.validate-token.token-invalid',
      message: '유효하지 않은 토큰입니다.',
      httpStatus: HttpStatus.UNAUTHORIZED,
    } as BusinessExceptionType,
  );
}
