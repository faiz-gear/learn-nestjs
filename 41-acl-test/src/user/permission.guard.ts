import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express';
import { Reflector } from '@nestjs/core';
import { RedisService } from 'src/redis/redis.service';

@Injectable()
export class PermissionGuard implements CanActivate {
  @Inject(UserService)
  private readonly userService: UserService;

  @Inject(Reflector)
  private readonly reflector: Reflector;

  @Inject(RedisService)
  private readonly redisService: RedisService;

  async canActivate(context: ExecutionContext) {
    const request: Request = context.switchToHttp().getRequest();

    // 从redis缓存中获取用户的权限
    const listKey = `user_${request.session.user.username}_permissions`;
    let permissions = await this.redisService.listGet(listKey);

    // 如果redis中没有用户的权限，从数据库中获取
    if (permissions.length === 0) {
      const userWithPermissions = await this.userService.getUserWithPermissions(
        request.session.user.username,
      );
      permissions = userWithPermissions.permissions.map(
        (permission) => permission.name,
      );
      this.redisService.listSet(listKey, permissions, 60 * 30); // 30分钟过期
    }

    const permissionMetadata = this.reflector.get<string>(
      'permission',
      context.getHandler(),
    );

    if (permissions.some((permission) => permission === permissionMetadata)) {
      return true;
    } else {
      throw new UnauthorizedException('没有权限访问该接口');
    }
  }
}
