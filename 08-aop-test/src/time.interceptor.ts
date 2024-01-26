import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';

@Injectable()
export class TimeInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(context.getClass(), context.getHandler()); // 可以通过context获取到当前的Controller、handler、metadata等信息
    const startTime = Date.now();
    return next
      .handle()
      .pipe(tap(() => console.log('time', Date.now() - startTime)));
  }
}
