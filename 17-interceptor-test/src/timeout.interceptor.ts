import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  RequestTimeoutException,
} from '@nestjs/common';
import {
  Observable,
  TimeoutError,
  catchError,
  throwError,
  timeout,
} from 'rxjs';

@Injectable()
export class TimeoutInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      timeout(3000), // timeout operator.这里3秒没接收到消息就会抛出TimeoutError
      catchError((err) => {
        if (err instanceof TimeoutError) {
          console.log(err);
          // TimeoutError是rxjs的异常，需要转换成Nest的异常RequestTimeoutException
          return throwError(() => new RequestTimeoutException());
        }
        // 如果不是TimeoutError，就抛出原来的异常
        return throwError(() => err);
      }),
    );
  }
}
