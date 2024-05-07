import { Controller, Get, Res, Sse } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Sse('list')
  async universityList(
    @Res({
      passthrough: true,
    })
    res: Response,
  ) {
    res.setHeader('Content-Type', 'text/event-stream; charset=utf-8');
    return this.appService.getUniversityData();
  }
}
