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
    console.log('interceptor');
    console.log(
      'controller roles',
      this.reflector.get<string[]>('roles', context.getClass()),
    );
    console.log(
      'handler roles',
      this.reflector.get<string[]>('roles', context.getHandler()),
    );
    console.log(
      'reflector get all',
      this.reflector.getAll('roles', [
        context.getHandler(),
        context.getClass(),
      ]),
    );

    // The getAllAndMerge() method returns a single array of metadata values from the specified metadata key and context.
    console.log(
      'reflector get all and merge',
      this.reflector.getAllAndMerge('roles', [
        context.getHandler(),
        context.getClass(),
      ]),
    );

    // The getAllAndOverride() method returns a single array of metadata values from the specified metadata key and context.
    console.log(
      'reflector get all and override',
      this.reflector.getAllAndOverride('roles', [
        context.getHandler(),
        context.getClass(),
      ]),
    );

    return next.handle();
  }
}
