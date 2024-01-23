import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {} // constructor 注入service依赖

  @Inject(AppService) // 使用Inject装饰器注入service依赖
  private appService: AppService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
