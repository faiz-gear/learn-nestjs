import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    // console.log(
    //   '🚀 ~ file: app.controller.ts ~ line 10 ~ AppController ~ getHello ~ headers',
    //   headers,
    // );
    console.log('access');
    return this.appService.getHello();
  }
}
