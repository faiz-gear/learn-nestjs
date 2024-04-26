import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    // 传入prisma client配置
    super({
      log: [
        {
          emit: 'stdout',
          level: 'query',
        },
      ],
    });
  }
  onModuleInit() {
    this.$connect(); // 连接数据库
  }
}
