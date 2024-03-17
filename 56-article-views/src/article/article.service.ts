import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { Article } from './entities/article.entity';
import { RedisService } from 'src/redis/redis.service';

const INVALID_ACCESS_INTERVAL = 60 * 10; // 10分钟

@Injectable()
export class ArticleService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  @Inject(RedisService)
  private redisService: RedisService;

  async findOne(id: number) {
    return await this.entityManager.findOneBy(Article, {
      id,
    });
  }

  async view(id: number, userId: string) {
    // const article = await this.findOne(id);
    // article.viewCount++;
    // await this.entityManager.save(article);
    // return article.viewCount;

    const res = await this.redisService.hashGet(`article_${id}`);
    if (res.viewCount === undefined) {
      // redis中没有存访问记录, 添加访问记录, 并记录方法的userId或者ip
      const article = await this.findOne(id);
      article.viewCount++;
      // update比save更高效, save需要先select再update
      await this.entityManager.update(
        Article,
        { id },
        {
          viewCount: article.viewCount,
        },
      );
      await this.redisService.hashSet(
        `article_${id}`,
        {
          viewCount: article.viewCount,
          likeCount: article.likeCount,
          colletCount: article.collectCount,
        },
        60,
      );

      await this.redisService.set(
        `user_${userId}_article_${id}`,
        1,
        INVALID_ACCESS_INTERVAL,
      );

      return article.viewCount;
    } else {
      // redis存在访问记录, 根据redis缓存判断该用户是否在访问有效时间内, 有效时间内则viewCount + 1
      const flag = await this.redisService.get(`user_${userId}_article_${id}`);
      //
      if (flag) return res.viewCount;

      await this.redisService.hashSet(`article_${id}`, {
        ...res,
        viewCount: +res.viewCount + 1,
      });

      await this.redisService.set(
        `user_${userId}_article_${id}`,
        1,
        INVALID_ACCESS_INTERVAL,
      );
      return +res.viewCount + 1;
    }
  }

  async flushRedisToDB() {
    const keys = await this.redisService.keys(`article_*`);

    for (let i = 0; i < keys.length; i++) {
      const key = keys[i];

      const res = await this.redisService.hashGet(key);

      const [, id] = key.split('_');

      await this.entityManager.update(
        Article,
        { id },
        {
          viewCount: +res.viewCount,
        },
      );
    }
  }
}
