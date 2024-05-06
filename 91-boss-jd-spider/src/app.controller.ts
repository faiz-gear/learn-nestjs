import { Controller, Get, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Observable } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('start-spider')
  startSpider() {
    this.appService.startSpider();
    return '爬虫已启动';
  }

  @Sse('events')
  sse() {
    return new Observable((observer) => {
      this.appService.startSpider(observer);
    });
  }
}
