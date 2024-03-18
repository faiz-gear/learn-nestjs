import { Inject, Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { UniqueCodeService } from './unique-code.service';
import { ShortLongMap } from './entities/ShortLongMap';
import { UniqueCode } from './entities/UniqueCode';

@Injectable()
export class ShortLongMapService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  @Inject(UniqueCodeService)
  private uniqueCodeService: UniqueCodeService;

  async generate(longUrl: string) {
    // 找到一个未使用的code
    let uniqueCode = await this.entityManager.findOneBy(UniqueCode, {
      status: 0,
    });

    if (!uniqueCode) {
      uniqueCode = await this.uniqueCodeService.generateCode();
    }

    const map = new ShortLongMap();
    map.shortUrl = uniqueCode.code;
    map.longUrl = longUrl;

    await this.entityManager.insert(ShortLongMap, map);

    // 更新code状态
    await this.entityManager.update(UniqueCode, uniqueCode.id, {
      status: 1,
    });

    return map.shortUrl;
  }

  async getLongUrl(code: string) {
    const map = await this.entityManager.findOneBy(ShortLongMap, {
      shortUrl: code,
    });

    if (map) {
      return map.longUrl;
    } else {
      return null;
    }
  }
}
