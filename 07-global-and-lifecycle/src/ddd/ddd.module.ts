import {
  BeforeApplicationShutdown,
  Module,
  OnApplicationBootstrap,
  OnApplicationShutdown,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { DddService } from './ddd.service';
import { DddController } from './ddd.controller';

@Module({
  controllers: [DddController],
  providers: [DddService],
}) // 会依次调用 Controller -> Service -> Module 的 onModuleInit、OnApplicationBootstrap 方法
export class DddModule
  implements
    OnModuleInit,
    OnApplicationBootstrap,
    OnModuleDestroy,
    BeforeApplicationShutdown,
    OnApplicationShutdown
{
  onApplicationShutdown(signal?: string) {
    console.log('DddModule onApplicationShutdown');
  }
  beforeApplicationShutdown(signal?: string) {
    console.log('DddModule beforeApplicationShutdown');
  }
  onModuleDestroy() {
    console.log('DddModule onModuleDestroy');
  }
  onApplicationBootstrap() {
    console.log('DddModule onApplicationBootstrap');
  }
  onModuleInit() {
    console.log('DddModule onModuleInit');
  }
}
