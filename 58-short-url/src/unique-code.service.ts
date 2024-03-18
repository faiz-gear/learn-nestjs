import { Injectable } from '@nestjs/common';
import { InjectEntityManager } from '@nestjs/typeorm';
import { EntityManager } from 'typeorm';
import { generateRandomStr } from './utils';
import { UniqueCode } from './entities/UniqueCode';
import { Cron, CronExpression } from '@nestjs/schedule';

@Injectable()
export class UniqueCodeService {
  @InjectEntityManager()
  private entityManager: EntityManager;

  // @Cron(CronExpression.EVERY_5_SECONDS)
  async generateCode() {
    const str = generateRandomStr(6);

    const uniqueCode = await this.entityManager.findOneBy(UniqueCode, {
      code: str,
    });

    if (uniqueCode) {
      // 如果已经存在，则重新生成
      return this.generateCode();
    } else {
      // 不存在则插入新的uniqueCode
      const newUniqueCode = new UniqueCode();
      newUniqueCode.code = str;
      newUniqueCode.status = 0;
      return await this.entityManager.insert(UniqueCode, newUniqueCode);
    }
  }

  // 每天4点批量生成10000个code
  @Cron(CronExpression.EVERY_DAY_AT_4AM)
  async batchGenerateCode() {
    for (let i = 0; i < 10000; i++) {
      this.generateCode();
    }
  }
}
