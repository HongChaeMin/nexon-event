import { HttpStatus } from '@nestjs/common';
import { BusinessHttpException, BusinessExceptionType } from '@repo/global-util';

export class GatewayException {
  static readonly TOKEN_NOT_FOUND = new BusinessHttpException(
    [
      {
        code: 'gateway.jwt-guard.token-not-found',
        message: '토큰이 없습니다.',
        httpStatus: HttpStatus.UNAUTHORIZED,
      } as BusinessExceptionType,
    ],
    HttpStatus.UNAUTHORIZED,
  );
}

