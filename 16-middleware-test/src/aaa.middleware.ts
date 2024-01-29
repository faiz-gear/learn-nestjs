import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';
import { AppService } from './app.service';

@Injectable()
export class AaaMiddleware implements NestMiddleware {
  // 注入服务
  constructor(private readonly appService: AppService) {}

  use(req: Request, res: Response, next: () => void) {
    console.log('before', this.appService.getHello());
    // 调用下一个middleware
    next();
    console.log('after');
  }
}
