import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { CccService } from './ccc.service';
import { CccController } from './ccc.controller';
import { ModuleRef } from '@nestjs/core';

@Module({
  controllers: [CccController],
  providers: [CccService],
})
export class CccModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  constructor(private moduleRef: ModuleRef) {}

  onApplicationShutdown(signal?: string) {
    // moduleRef获取当前模块引用的provider(service)实例, 调用实例的一些销毁\关闭方法
    const cccService = this.moduleRef.get<CccService>(CccService);
    console.log(cccService.findAll());
    console.log('CccModule onApplicationShutdown');
  }
  beforeApplicationShutdown(signal?: string) {
    console.log('CccModule beforeApplicationShutdown');
  }
  onModuleDestroy() {
    console.log('CccModule onModuleDestroy');
  }
  onApplicationBootstrap() {
    console.log('CccModule onApplicationBootstrap');
  }
  onModuleInit() {
    console.log('CccModule onModuleInit');
  }
}
