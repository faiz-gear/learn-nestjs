import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { CommonService } from '@app/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(CommonService)
  private readonly commonService: CommonService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('aaa')
  async aaa() {
    return 'aaa' + (await this.commonService.xxx());
  }
}
