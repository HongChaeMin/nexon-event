import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthException } from '../auth.exception';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger = new Logger(GlobalExceptionFilter.name);
  private exception: HttpException;
  private isAuthException: boolean;

  catch(exception: HttpException, host: ArgumentsHost) {
    exception = this.checkNotFoundException(exception);

    this.isAuthException = exception instanceof AuthException;
    this.exception = exception;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    response.status(this.getStatus()).json(this.getBody(request));
  }

  private getStatus(): HttpStatus {
    return this.isAuthException
      ? this.exception.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR;
  }

  private getBody(request: Request): string | object {
    const body = this.isAuthException
      ? this.exception.getResponse()
      : {
          errors: [
            {
              statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
              path: request.url,
              message:
                '서버에 알 수 없는 에러가 생겼습니다. 관리자에게 문의해주세요.',
            },
          ],
        };
    if (process.env.NODE_ENV !== 'production') this.setDebug(body);
    return body;
  }

  private setDebug(body: object | string) {
    const format = this.exception.stack?.split('\n');
    body['debug'] = {
      type: format?.[0],
      file: format?.[1].match(/at (\w+\.\w+)/)?.[1],
    };
  }

  private checkNotFoundException(exception: HttpException) {
    const isNotFoundException = exception instanceof NotFoundException;
    if (isNotFoundException) {
      return new AuthException(
        [
          {
            code: 'auth.not-found.url',
            message: '존재하지 않은 URL 호출입니다.',
            httpStatus: HttpStatus.NOT_FOUND,
          },
        ],
        HttpStatus.NOT_FOUND,
      );
    }
    return exception;
  }
}
