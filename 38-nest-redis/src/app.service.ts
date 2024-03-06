import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
import { InjectRedis } from '@nestjs-modules/ioredis';

@Injectable()
export class AppService {
  @InjectRedis()
  private readonly redisClient: Redis;

  async getHello() {
    const value = await this.redisClient.keys('*');
    console.log(
      '🚀 ~ file: app.service.ts ~ line 14 ~ AppService ~ getHello ~ value',
      value,
    );

    return value;
  }
}
