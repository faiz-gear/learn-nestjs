import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Role } from './user';

@Injectable()
export class AaaGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // ExecutionContext继承自ArgumentsHost，可以获取到当前上下文的request、response、next
    // 同时扩展getClass(获取当前Controller)、getHandler(获取当前路由处理函数)方法

    // 当前路由要求的角色
    const requiredRoles = this.reflector.get<Role[]>(
      'roles',
      context.getHandler(),
    );
    if (!requiredRoles) return true; // 没有要求角色，直接通过

    const { user } = context.switchToHttp().getRequest();

    return requiredRoles.some((role) => user && user.roles.includes(role));
  }
}
