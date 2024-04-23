import { Controller, Get, Inject, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientProxy } from '@nestjs/microservices';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject('USER_SERVICE')
  private readonly userClient: ClientProxy;

  @Get('sum')
  sum(@Query('num') str: string): Observable<number> {
    const numArr = str.split(',').map((num) => parseInt(num, 10));
    // emit 调用 微服务 EventPattern 装饰的方法
    this.userClient.emit('logger', 'sum');
    // send 调用 微服务 MessagePattern 装饰的方法
    return this.userClient.send('sum', numArr);
  }
}
