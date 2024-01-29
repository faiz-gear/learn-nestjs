import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { AppService } from './app.service';

@Injectable()
export class AaaInterceptor implements NestInterceptor {
  constructor(private readonly appService: AppService) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    console.log(await this.appService.getHello());
    const now = Date.now();
    return next.handle().pipe(
      // tap operator 不会改变数据，只是执行一段额外的逻辑, 这里是打印路由处理函数的执行时间
      tap(() => console.log(Date.now() - now)),
    );
  }
}
