import {
  BadRequestException,
  Controller,
  Get,
  Inject,
  Query,
} from '@nestjs/common';
import { AppService } from './app.service';
import { RedisService } from './redis/redis.service';

const POSITIONS_TOKEN = 'positions';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Inject(RedisService)
  private readonly redisService: RedisService;

  @Get('addPos')
  async addPos(
    @Query('name') posName: string,
    @Query('longitude') long: number,
    @Query('latitude') lat: number,
  ) {
    if (!posName || !long || !lat) {
      throw new BadRequestException('位置参数信息不全');
    }
    try {
      await this.redisService.geoAdd(POSITIONS_TOKEN, posName, [long, lat]);
    } catch (err) {
      throw new BadRequestException(err.message);
    }

    return {
      statusCode: 200,
      message: '添加成功',
    };
  }

  @Get('getPos')
  async getPos(@Query('name') posName: string) {
    return await this.redisService.geoPos(POSITIONS_TOKEN, posName);
  }

  @Get('allPos')
  async allPos() {
    return await this.redisService.geoList(POSITIONS_TOKEN);
  }

  @Get('nearbySearch')
  async nearbySearch(
    @Query('longitude') long: number,
    @Query('latitude') lat: number,
    @Query('radius') radius: number,
  ) {
    if (!long || !lat || !radius) {
      throw new BadRequestException('参数信息不全');
    }

    return await this.redisService.geoRadius(
      POSITIONS_TOKEN,
      [long, lat],
      radius,
    );
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
