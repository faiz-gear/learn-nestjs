import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';

@Injectable()
export class MapTestInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      // map operator 会改变数据，这里是在路由处理函数handler的返回数据中加入 code 和 message
      map((data) => ({
        code: 200,
        message: 'success',
        data,
      })),
    );
  }
}
