import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  @InjectRedis()
  private redisClient: Redis;

  async hashGet(key: string) {
    return await this.redisClient.hgetall(key);
  }

  async hashSet(key: string, obj: Record<string, any>, ttl?: number) {
    for (const name in obj) {
      await this.redisClient.hset(key, name, obj[name]);
    }

    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}
