import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { ConfigService } from '@nestjs/config';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(ConfigService)
  private configService: ConfigService;

  @Get()
  getHello() {
    return {
      // aaa: this.configService.get('aaa'),
      // bbb: this.configService.get('bbb'),
      // common: this.configService.get('common'),
      db: this.configService.get('db'),
      yamlConfig: this.configService.get('yamlConfig'),
    };
  }
}
