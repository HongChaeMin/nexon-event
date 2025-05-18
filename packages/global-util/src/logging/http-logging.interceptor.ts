import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, pipe, tap } from 'rxjs';
import { Request } from 'express';
import { AssignmentLogger } from './assignment.logger';

@Injectable()
export class HttpLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logger = new AssignmentLogger(context.getClass().name);

    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const now = Date.now();
    return next.handle().pipe(
      tap(() =>
        logger.request(request?.method, request?.url, Date.now() - now),
      ),
      tap((json) => logger.response(JSON.stringify(json)?.substring(0, 100))),
      pipe(
        catchError((error) => {
          logger.errors(request?.method, request?.url, Date.now() - now);
          logger.trace(error.stack);
          throw error;
        }),
      ),
    );
  }
}
