import { Injectable } from '@nestjs/common';

// 声明服务Provider的装饰器
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
