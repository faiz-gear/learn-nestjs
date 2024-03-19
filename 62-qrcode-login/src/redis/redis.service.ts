import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  @InjectRedis()
  private readonly redis: Redis;

  async hashSet(key: string, field: string, value: string, ttl?: number) {
    await this.redis.hset(key, field, value);

    if (ttl) {
      await this.redis.expire(key, ttl);
    }
  }

  async hashGet(key: string, field: string) {
    return await this.redis.hget(key, field);
  }

  async set(key: string, value: string, ttl?: number) {
    await this.redis.set(key, value);

    if (ttl) {
      await this.redis.expire(key, ttl);
    }
  }

  async get(key: string) {
    return await this.redis.get(key);
  }
}
