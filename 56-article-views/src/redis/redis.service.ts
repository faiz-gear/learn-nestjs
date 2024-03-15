import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  @InjectRedis()
  private redisClient: Redis;

  async keys(pattern: string) {
    return await this.redisClient.keys(pattern);
  }

  async get(key: string) {
    return await this.redisClient.get(key);
  }

  async set(key: string, value: string | number, ttl?: number) {
    await this.redisClient.set(key, value);

    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }

  async hashGet(key: string) {
    return await this.redisClient.hgetall(key);
  }

  async hashSet(
    key: string,
    value: Record<string, string | number>,
    ttl?: number,
  ) {
    await this.redisClient.hmset(key, value);

    if (ttl) {
      await this.redisClient.expire(key, ttl);
    }
  }
}
