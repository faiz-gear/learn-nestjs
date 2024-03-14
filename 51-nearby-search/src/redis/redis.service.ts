import { InjectRedis } from '@nestjs-modules/ioredis';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  @InjectRedis()
  private redisClient: Redis;

  async geoAdd(key: string, posName: string, posLoc: [number, number]) {
    return await this.redisClient.geoadd(key, posLoc[0], posLoc[1], posName);
  }

  async geoPos(key: string, posName: string) {
    const [[longitude, latitude]] = await this.redisClient.geopos(key, posName);

    return {
      name: posName,
      longitude,
      latitude,
    };
  }

  async geoList(key) {
    const positionKeys = await this.redisClient.zrange(key, 0, -1);

    const list = [];
    for (const pos of positionKeys) {
      const res = await this.geoPos(key, pos);
      list.push(res);
    }

    return list;
  }

  async geoRadius(key: string, pos: [number, number], radius: number) {
    const positionKeys = (await this.redisClient.georadius(
      key,
      pos[0],
      pos[1],
      radius,
      'km',
    )) as string[];

    const list = [];
    for (const pos of positionKeys) {
      const res = await this.geoPos(key, pos);
      list.push(res);
    }

    return list;
  }
}
