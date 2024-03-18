import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Param,
  Query,
  Redirect,
} from '@nestjs/common';
import { AppService } from './app.service';
import { ShortLongMapService } from './short-long-map.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(ShortLongMapService)
  private shortLongMapService: ShortLongMapService;

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('short-url')
  async generateShortUrl(@Query('longUrl') longUrl) {
    if (!longUrl) {
      throw new BadRequestException('缺少参数 longUrl');
    }
    return this.shortLongMapService.generate(longUrl);
  }

  @Get(':code')
  @Redirect()
  async jump(@Param('code') code) {
    const longUrl = await this.shortLongMapService.getLongUrl(code);
    console.log(
      '🚀 ~ file: app.controller.ts ~ line 37 ~ AppController ~ jump ~ longUrl',
      longUrl,
    );

    if (longUrl) {
      return { url: longUrl, statusCode: 302 };
    } else {
      throw new BadRequestException('找不到对应的链接');
    }
  }
}
