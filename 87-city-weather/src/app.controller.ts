import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Param,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import pinyin from 'pinyin';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('pinyin')
  pinyin(@Query('text') text: string) {
    return pinyin(text, {
      style: pinyin.STYLE_NORMAL,
    }).join('');
  }

  @Inject(HttpService)
  private httpService: HttpService;

  @Get('weather/:city')
  async weather(@Param('city') city: string) {
    const cityPinyin = pinyin(city, { style: 'normal' }).join('');

    // 获取城市信息
    const { data } = await firstValueFrom(
      this.httpService.get(
        `https://geoapi.qweather.com/v2/city/lookup?location=${cityPinyin}&key=e855061f465e485ab7f46fdd9e29dc57`,
      ),
    );

    const location = data?.['location']?.[0];

    if (!location) {
      throw new BadRequestException('没有对应的城市信息');
    }

    // 获取天气信息
    const { data: weatherData } = await firstValueFrom(
      this.httpService.get(
        `https://devapi.qweather.com/v7/weather/7d?location=${location.id}&key=e855061f465e485ab7f46fdd9e29dc57`,
      ),
    );

    return weatherData;
  }
}
