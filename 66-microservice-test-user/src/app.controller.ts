import { Controller } from '@nestjs/common';
import { AppService } from './app.service';
import { EventPattern, MessagePattern } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern('sum')
  sum(data: number[]): number {
    return data.reduce((a, b) => a + b);
  }

  // 不需要返回消息的装饰器
  @EventPattern('logger')
  log(str: string) {
    console.log(str);
  }
}
