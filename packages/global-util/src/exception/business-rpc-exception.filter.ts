import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Request, Response } from 'express';
import { BusinessRpcException } from './business-rpc.exception';

@Catch(RpcException)
export class GlobalRpcExceptionFilter implements ExceptionFilter {
  private exception: RpcException;

  catch(exception: RpcException, host: ArgumentsHost) {
    this.exception = exception;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const response = ctx.getResponse<Response>();

    response.status(this.getStatus()).json(this.getBody(request));
  }

  private getStatus(): HttpStatus {
    return this.exception.getError()['httpStatus'] || 500
  }

  private getBody(request: Request): string | object {
      const body = {
        errors: [
          {
            statusCode: this.exception.getError()['httpStatus'] || 500,
            path: request.url,
            message:
              this.exception.getError()['message'] || '서버에 알 수 없는 에러가 생겼습니다. 관리자에게 문의해주세요.',
          },
        ],
      };
    this.setDebug(body);
    return body;
  }

  private setDebug(body: object | string) {
    const format = this.exception.stack?.split('\n');
    body['debug'] = {
      type: format?.[0],
      file: format?.[1].match(/at (\w+\.\w+)/)?.[1],
    };
  }
}
