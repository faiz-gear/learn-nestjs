import {
  CallHandler,
  ExecutionContext,
  Inject,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AaaInterceptor implements NestInterceptor {
  @Inject(Reflector)
  private readonly reflector: Reflector;

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const classMetadata = this.reflector.get('roles', context.getClass());
    const handlerMetadata = this.reflector.get('roles', context.getHandler());
    console.log('aaa interceptor', classMetadata, handlerMetadata);
    return next.handle();
  }
}
