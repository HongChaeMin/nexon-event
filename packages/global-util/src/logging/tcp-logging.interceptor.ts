import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, pipe, tap } from 'rxjs';
import { AssignmentLogger } from './assignment.logger';

@Injectable()
export class TcpLoggingInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const logger = new AssignmentLogger(context.getClass().name);

    const data = context.switchToRpc().getData();

    const now = Date.now();
    return next.handle().pipe(
      tap(() =>
        logger.request('SERVICE', 'AUTH', Date.now() - now),
      ),
      tap(() => logger.response(JSON.stringify(data)?.substring(0, 100))),
      pipe(
        catchError((error) => {
          logger.errors('SERVICE', 'AUTH', Date.now() - now);
          logger.trace(error.stack);
          throw error;
        }),
      ),
    );
  }
}
