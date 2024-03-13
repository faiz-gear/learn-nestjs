import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class AppService {
  @InjectRedis()
  private readonly redisClient: Redis;

  async getHello() {
    const keys = await this.redisClient.keys('*');
    console.log(
      '🚀 ~ file: app.service.ts ~ line 12 ~ AppService ~ getHello ~ keys',
      keys,
    );
    return 'Hello World!';
  }
}
