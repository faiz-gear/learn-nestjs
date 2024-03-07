import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class LoginGuard implements CanActivate {
  @Inject(JwtService)
  private jwtService: JwtService;

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();

    const authorization = request.headers.authorization || '';

    const bearer = authorization.split(' ');

    if (!bearer || bearer.length < 2) {
      throw new HttpException('未登录', HttpStatus.UNAUTHORIZED);
    }

    const token = bearer[1];

    try {
      this.jwtService.verify(token);
      return true;
    } catch (e) {
      throw new UnauthorizedException('Token验证失败');
    }
  }
}
