import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('hello')
  getHello(): string {
    console.log('hello');
    return this.appService.getHello();
  }
  @Get('hello2')
  getHello2(): string {
    console.log('hello2');
    return this.appService.getHello();
  }
  @Get('world')
  getWorld(): string {
    console.log('world');
    return this.appService.getHello();
  }
  @Get('world2')
  getWorld2(): string {
    console.log('world2');
    return this.appService.getHello();
  }
}
