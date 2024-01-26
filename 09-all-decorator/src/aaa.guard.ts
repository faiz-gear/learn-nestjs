import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AaaGuard implements CanActivate {
  @Inject(Reflector)
  private readonly reflector: Reflector;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const classMetadata = this.reflector.get('roles', context.getClass());
    const handlerMetadata = this.reflector.get('roles', context.getHandler());

    console.log('aaa guard', classMetadata, handlerMetadata);

    return true;
  }
}
