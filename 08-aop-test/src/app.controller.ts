import {
  Controller,
  Get,
  ParseUUIDPipe,
  Query,
  UseFilters,
  UseGuards,
  UseInterceptors,
  // UsePipes,
  // ValidationPipe,
} from '@nestjs/common';
import { AppService } from './app.service';
import { LoginGuard } from './login.guard';
import { TimeInterceptor } from './time.interceptor';
import { ValidatePipe } from './validate.pipe';
import { TestFilter } from './test.filter';

@Controller()
@UseInterceptors(TimeInterceptor) // 路由级别的拦截器
// @UsePipes(ValidationPipe) // 路由级别的管道
@UseFilters(TestFilter) // 路由级别的异常响应拦截器
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    console.log('get hello');
    return this.appService.getHello();
  }

  @Get('aaa')
  @UseGuards(LoginGuard) // 局部路由守卫
  aaa() {
    console.log('aaa');
    return 'aaa';
  }

  @Get('bbb')
  @UseInterceptors(TimeInterceptor) // handler级别的拦截器（拦截器和路由守卫可以作用于某个handler）
  bbb() {
    console.log('bbb');
    return 'bbb';
  }

  @Get('ccc')
  @UseFilters(TestFilter) // handler级别的异常响应拦截器
  ccc(@Query('num', ValidatePipe) num: number) {
    // handler级别的自定义管道
    console.log('ccc', num);
    return 'ccc' + num;
  }

  @Get('ddd')
  ddd(@Query('id', ParseUUIDPipe) id: string) {
    // handler级别的内置管道
    console.log('ddd', id + 'my');
    return id + 'my';
  }
}
