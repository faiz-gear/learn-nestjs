import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { Role } from './user/entities/role.entity';

declare module 'express' {
  interface Request {
    user: {
      username: string;
      roles: Role[];
    };
  }
}

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private readonly jwtService: JwtService;

  @Inject(Reflector)
  private readonly reflector: Reflector;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization;

    const notRequireLogin = this.reflector.getAllAndOverride<boolean>(
      'not-require-login',
      [context.getHandler(), context.getClass()],
    );

    if (notRequireLogin) return true;

    if (!authorization) {
      throw new UnauthorizedException();
    }

    try {
      const token = authorization.split(' ')[1];
      const data = this.jwtService.verify(token);
      console.log(
        '🚀 ~ file: login.guard.ts ~ line 31 ~ LoginGuard ~ data',
        data,
      );
      request.user = data.user;

      return true;
    } catch (e) {
      throw new UnauthorizedException('token失效，请重新登录');
    }
  }
}
