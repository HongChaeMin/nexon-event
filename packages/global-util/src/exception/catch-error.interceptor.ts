import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { RpcException } from '@nestjs/microservices';

@Injectable()
export class CatchErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(err => {
        if (!err) {
          return throwError(() => new RpcException('Unknown error'));
        }
        if (err instanceof RpcException) {
          return throwError(() => err);
        }
        return throwError(() => new RpcException(typeof err === 'object' ? JSON.stringify(err) : err));
      }),
    );
  }
}
